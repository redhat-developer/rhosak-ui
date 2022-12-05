import type { DefaultApi } from "@rhoas/kafka-management-sdk";
import type { GetKafkaInstanceMetricsResponse, TimeSeriesMetrics } from "ui";
import type { SafeRangeQuery } from "./types";

type FetchKafkaInstanceMetricsProps = {
  getMetricsByRangeQuery: DefaultApi["getMetricsByRangeQuery"];
  kafkaId: string;
  duration: number;
  interval: number;
};

export async function fetchKafkaInstanceMetrics({
  getMetricsByRangeQuery,
  kafkaId,
  duration,
  interval,
}: FetchKafkaInstanceMetricsProps): Promise<GetKafkaInstanceMetricsResponse> {
  const response = await getMetricsByRangeQuery(kafkaId, duration, interval, [
    "kubelet_volume_stats_used_bytes",
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
        m.metric.persistentvolumeclaim &&
        m.metric.persistentvolumeclaim.includes("zookeeper")
      )
  ) as SafeRangeQuery[];

  const usedDiskSpaceMetrics: TimeSeriesMetrics = {};
  const connectionAttemptRateMetrics: TimeSeriesMetrics = {};
  const clientConnectionsMetrics: TimeSeriesMetrics = {};

  const connectionRateLimit = 0,
    connectionsLimit = 0,
    diskSpaceLimit = 0;

  safeMetrics.forEach((m) => {
    const { __name__: name } = m.metric;

    function addAggregatedValuesTo(metric: TimeSeriesMetrics) {
      m.values.forEach(
        ({ value, timestamp }) =>
          (metric[timestamp] = value + (metric[timestamp] || 0))
      );
    }

    switch (name) {
      case "kubelet_volume_stats_used_bytes":
        addAggregatedValuesTo(usedDiskSpaceMetrics);
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
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    diskSpaceLimit,
    connectionRateLimit,
    connectionsLimit,
  };
}
