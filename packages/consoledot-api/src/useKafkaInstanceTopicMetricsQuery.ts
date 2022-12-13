import { useQueryClient } from "@tanstack/react-query";
import type { FetchTopicsMetricsProps } from "./fetchKafkaTopicMetrics";
import { fetchKafkaTopicMetrics } from "./fetchKafkaTopicMetrics";
import { kafkaQueries } from "./queryKeys";
import { useKms } from "./useApi";

export function useKafkaInstanceTopicMetricsQuery() {
  const getKms = useKms();
  const queryClient = useQueryClient();

  return (params: Omit<FetchTopicsMetricsProps, "getMetricsByRangeQuery">) => {
    const api = getKms();

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.metrics.topic(params),
      queryFn: async () => {
        return fetchKafkaTopicMetrics({
          getMetricsByRangeQuery: (...args) =>
            api.getMetricsByRangeQuery(...args),
          ...params,
        });
      },
    });
  };
}
