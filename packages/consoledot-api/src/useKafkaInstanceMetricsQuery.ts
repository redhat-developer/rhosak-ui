import { useQueryClient } from "react-query";
import type { FetchKafkaInstanceMetricsProps } from "./fetchKafkaInstanceMetrics";
import { fetchKafkaInstanceMetrics } from "./fetchKafkaInstanceMetrics";
import { kafkaQueries } from "./queryKeys";
import { useKms } from "./useApi";

export function useKafkaInstanceMetricsQuery() {
  const getKms = useKms();
  const queryClient = useQueryClient();

  return (params: Omit<FetchKafkaInstanceMetricsProps, 'getMetricsByRangeQuery'>) => {
    const api = getKms();

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.metrics.instance(params),
      queryFn: async () => {
        return fetchKafkaInstanceMetrics({
          getMetricsByRangeQuery: (...args) =>
            api.getMetricsByRangeQuery(...args),
          ...params
        });
      },
    });
  };
}
