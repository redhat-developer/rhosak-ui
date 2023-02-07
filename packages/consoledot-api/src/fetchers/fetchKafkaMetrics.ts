import type { DefaultApi } from "@rhoas/kafka-management-sdk";
import type {
  BrokerBytesMetric,
  BrokerValue,
  GetKafkaInstanceMetricsResponse,
  PartitionBytesMetric,
  TimeSeriesMetrics,
} from "ui";
import type { SafeRangeQuery } from "../types";

export type FetchKafkaMetricsProps = {
  getMetricsByRangeQuery: DefaultApi["getMetricsByRangeQuery"];
  id: string;
  duration: number;
  interval: number;
  selectedBroker: BrokerValue | undefined;
};

export async function fetchKafkaMetrics({
  getMetricsByRangeQuery,
  id,
  duration,
  interval,
  selectedBroker,
}: FetchKafkaMetricsProps): Promise<GetKafkaInstanceMetricsResponse> {
  const response = await getMetricsByRangeQuery(id, duration, interval, [
    "kafka_server_brokertopicmetrics_bytes_in_total",
    "kas_broker_partition_log_size_bytes_top50",
    "kafka_namespace:kafka_server_socket_server_metrics_connection_creation_rate:sum",
    "kafka_namespace:kafka_server_socket_server_metrics_connection_count:sum",
  ]);

  // Remove all results with no data. Not sure this can really  happen but since
  // the types allow for undefined we need to do a bit of defensive programming.

  const safeMetrics: SafeRangeQuery[] = (response.data.items || []).filter(
    (m) =>
      // defensive programming
      !(
        m.values &&
        m.metric &&
        m.metric.topic &&
        m.metric.name &&
        m.metric.broker_id &&
        m.metric.partition_id &&
        m.metric.persistentvolumeclaim &&
        m.metric.persistentvolumeclaim.includes("zookeeper")
      )
  ) as SafeRangeQuery[];

  // Also filter for metrics about the selectedBroker, if specified
  const filteredMetrics = safeMetrics.filter((m) =>
    // filter for metrics for the selectedBroker, if needed
    selectedBroker !== undefined ? m.metric?.broker_id === selectedBroker : {}
  );

  const usedDiskSpaceMetrics: BrokerBytesMetric = {};
  const connectionAttemptRateMetrics: TimeSeriesMetrics = {};
  const clientConnectionsMetrics: TimeSeriesMetrics = {};
  const bytesPerPartitionMetrics: PartitionBytesMetric = {};

  const connectionRateLimit = 0,
    connectionsLimit = 0,
    diskSpaceLimit = 0;

  filteredMetrics.forEach((m) => {
    const { __name__: name, broker_id } = m.metric;

    function addAggregatedValuesTo(metric: TimeSeriesMetrics) {
      m.values.forEach(
        ({ value, timestamp }) =>
          (metric[timestamp] = value + (metric[timestamp] || 0))
      );
    }

    function addAggregateBrokerBytes() {
      console.log(broker_id);
      const broker =
        usedDiskSpaceMetrics[broker_id] || usedDiskSpaceMetrics["2"];
      m.values.forEach(
        ({ value, timestamp }) =>
          (broker[timestamp] = value + (broker[timestamp] || 0))
      );
      usedDiskSpaceMetrics[broker_id] = broker;
      console.log(broker);
    }

    function addAggregatePartitionBytes() {
      const partition = bytesPerPartitionMetrics[broker_id] || {};
      m.values.forEach(
        ({ value, timestamp }) =>
          (partition[timestamp] = value + (partition[timestamp] || 0))
      );
      bytesPerPartitionMetrics[broker_id] = partition;
    }

    switch (name) {
      case "kafka_server_brokertopicmetrics_bytes_in_total":
        addAggregateBrokerBytes();
        break;
      case "kas_broker_partition_log_size_bytes_top50":
        addAggregatePartitionBytes();
        break;
      case "kafka_namespace:kafka_server_socket_server_metrics_connection_creation_rate:sum":
        addAggregatedValuesTo(connectionAttemptRateMetrics);
        break;
      case "kafka_namespace:kafka_server_socket_server_metrics_connection_count:sum":
        addAggregatedValuesTo(clientConnectionsMetrics);
        break;
    }
  });

  return {
    usedDiskSpaceMetrics,
    bytesPerPartitionMetrics,
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    diskSpaceLimit,
    connectionRateLimit,
    connectionsLimit,
  };
}
