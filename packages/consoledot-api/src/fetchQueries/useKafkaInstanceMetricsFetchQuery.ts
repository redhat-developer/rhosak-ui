import { useQueryClient } from "@tanstack/react-query";
import type { FetchKafkaInstanceMetricsProps } from "../fetchers";
import { fetchKafkaInstanceMetrics } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaInstanceMetricsFetchQuery() {
  const { kafkasFleet } = useApi();
  const queryClient = useQueryClient();

  return (
    params: Omit<FetchKafkaInstanceMetricsProps, "getMetricsByRangeQuery">
  ) => {
    const api = kafkasFleet();

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.metrics.instance(params),
      queryFn: async () => {
        return fetchKafkaInstanceMetrics({
          getMetricsByRangeQuery: (...args) =>
            api.getMetricsByRangeQuery(...args),
          ...params,
        });
      },
    });
  };
}
