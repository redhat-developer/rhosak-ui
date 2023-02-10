import type { DefaultApi } from "@rhoas/kafka-management-sdk";
import type {
  BrokerBytesMetric,
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
  selectedBroker: string | undefined;
};

export async function fetchKafkaMetrics({
  getMetricsByRangeQuery,
  id,
  duration,
  interval,
}: FetchKafkaMetricsProps): Promise<GetKafkaInstanceMetricsResponse> {
  const response = await getMetricsByRangeQuery(id, duration, interval, [
    "kubelet_volume_stats_used_bytes",
    "kafka_broker_quota_totalstorageusedbytes",
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

  const brokers = Array.from(
    new Set(safeMetrics.map((m) => m.metric.broker_id))
  );

  const usedDiskSpaceMetrics: BrokerBytesMetric = {};
  const connectionAttemptRateMetrics: TimeSeriesMetrics = {};
  const clientConnectionsMetrics: TimeSeriesMetrics = {};
  const bytesPerPartitionMetrics: PartitionBytesMetric = {};

  const connectionRateLimit = 0,
    connectionsLimit = 0,
    diskSpaceLimit = 0;

  safeMetrics.forEach((m) => {
    const { __name__: name, topic, partition_id, broker_id } = m.metric;

    function addAggregatedValuesTo(metric: TimeSeriesMetrics) {
      m.values.forEach(
        ({ value, timestamp }) =>
          (metric[timestamp] = value + (metric[timestamp] || 0))
      );
    }

    function addAggregateBrokerBytes() {
      if (name === "kubelet_volume_stats_used_bytes") {
        const broker = usedDiskSpaceMetrics["total"] || {};
        m.values.forEach(({ value, timestamp }) => {
          broker[timestamp] = value + (broker[timestamp] || 0);
        });
        usedDiskSpaceMetrics["total"] = broker;
      } else {
        const broker = usedDiskSpaceMetrics[broker_id] || {};
        m.values.forEach(
          ({ timestamp, value }) =>
            (broker[timestamp] = value + broker[timestamp] || 0)
        );
        usedDiskSpaceMetrics[broker_id] = broker;
      }
    }

    function addAggregatePartitionBytes() {
      const partition = bytesPerPartitionMetrics[broker_id] || {};
      m.values.forEach(({ value, timestamp }) => {
        partition[timestamp] = value + (partition[timestamp] || 0);
      });
      bytesPerPartitionMetrics[broker_id + "/" + topic + "/" + partition_id] =
        partition;
    }
    switch (name) {
      case "kubelet_volume_stats_used_bytes":
      case "kafka_broker_quota_totalstorageusedbytes":
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
    brokers,
    usedDiskSpaceMetrics,
    bytesPerPartitionMetrics,
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    diskSpaceLimit,
    connectionRateLimit,
    connectionsLimit,
  };
}
