import { useQueryClient } from "@tanstack/react-query";
import type { FetchTopicsMetricsProps } from "../fetchers";
import { fetchTopicsMetrics } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useTopicsMetricsFetchQuery() {
  const { kafkasFleet } = useApi();
  const queryClient = useQueryClient();

  return (params: Omit<FetchTopicsMetricsProps, "getMetricsByRangeQuery">) => {
    const api = kafkasFleet();

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.metrics.topic(params),
      queryFn: async () => {
        return fetchTopicsMetrics({
          getMetricsByRangeQuery: (...args) =>
            api.getMetricsByRangeQuery(...args),
          ...params,
        });
      },
    });
  };
}
