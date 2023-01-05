import { useQueryClient } from "@tanstack/react-query";
import type { FetchKafkaMetricsProps } from "../fetchers";
import { fetchKafkaMetrics } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaMetricsFetchQuery() {
  const { kafkasFleet } = useApi();
  const queryClient = useQueryClient();

  return (params: Omit<FetchKafkaMetricsProps, "getMetricsByRangeQuery">) => {
    const api = kafkasFleet();

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.metrics.instance(params),
      queryFn: async () => {
        return fetchKafkaMetrics({
          getMetricsByRangeQuery: (...args) =>
            api.getMetricsByRangeQuery(...args),
          ...params,
        });
      },
    });
  };
}
