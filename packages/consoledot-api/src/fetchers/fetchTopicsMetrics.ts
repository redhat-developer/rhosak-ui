import type { DefaultApi } from "@rhoas/kafka-management-sdk";
import type {
  GetTopicsMetricsResponse,
  PartitionBytesMetric,
  TimeSeriesMetrics,
} from "ui";
import type { SafeRangeQuery } from "../types";

export type FetchTopicsMetricsProps = {
  getMetricsByRangeQuery: DefaultApi["getMetricsByRangeQuery"];
  id: string;
  duration: number;
  interval: number;
  selectedTopic: string | undefined;
};

export async function fetchTopicsMetrics({
  getMetricsByRangeQuery,
  id,
  duration,
  interval,
  selectedTopic,
}: FetchTopicsMetricsProps): Promise<
  Omit<GetTopicsMetricsResponse, "kafkaTopics">
> {
  const response = await getMetricsByRangeQuery(id, duration, interval, [
    "kafka_topic:kafka_server_brokertopicmetrics_bytes_in_total:rate5m",
    "kafka_topic:kafka_server_brokertopicmetrics_bytes_out_total:rate5m",
    "kas_topic_partition_log_size_bytes",
    "kafka_topic:kafka_server_brokertopicmetrics_messages_in_total:rate5m",
  ]);

  // Remove all results with no data. Not sure this can really  happen but since
  // the types allow for undefined we need to do a bit of defensive programming.
  const safeMetrics: SafeRangeQuery[] = (response.data.items || []).filter(
    (m) =>
      // defensive programming
      !(m.values && m.metric && m.metric.topic && m.metric.name)
  ) as SafeRangeQuery[];

  // Also filter for metrics about the selectedTopic, if specified
  const filteredMetrics = safeMetrics.filter((m) =>
    // filter for metrics for the selectedTopic, if needed
    selectedTopic !== undefined ? m.metric?.topic === selectedTopic : true
  );

  // get the unique topics we have metrics for in the selected time range
  const topics = Array.from(new Set(safeMetrics.map((m) => m.metric.topic)));

  const bytesIncoming: TimeSeriesMetrics = {};
  const bytesOutgoing: TimeSeriesMetrics = {};
  const bytesPerPartition: PartitionBytesMetric = {};
  const incomingMessageRate: TimeSeriesMetrics = {};

  filteredMetrics.forEach((m) => {
    const { __name__: name, topic, partition_id } = m.metric;

    function addAggregatedTotalBytesTo(metric: TimeSeriesMetrics) {
      m.values.forEach(
        ({ value, timestamp }) =>
          (metric[timestamp] = value + (metric[timestamp] || 0))
      );
    }

    function addAggregatePartitionBytes() {
      const partition = bytesPerPartition[topic] || {};
      m.values.forEach(
        ({ value, timestamp }) =>
          (partition[timestamp] = value + (partition[timestamp] || 0))
      );
      bytesPerPartition[topic + "/" + partition_id] = partition;
    }

    switch (name) {
      case "kafka_topic:kafka_server_brokertopicmetrics_bytes_in_total:rate5m":
        addAggregatedTotalBytesTo(bytesIncoming);
        break;
      case "kafka_topic:kafka_server_brokertopicmetrics_bytes_out_total:rate5m":
        addAggregatedTotalBytesTo(bytesOutgoing);
        break;
      case "kas_topic_partition_log_size_bytes":
        addAggregatePartitionBytes();
        break;
      case "kafka_topic:kafka_server_brokertopicmetrics_messages_in_total:rate5m":
        addAggregatedTotalBytesTo(incomingMessageRate);
        break;
    }
  });

  return {
    metricsTopics: topics,
    bytesOutgoing,
    bytesIncoming,
    bytesPerPartition,
    incomingMessageRate,
  };
}
