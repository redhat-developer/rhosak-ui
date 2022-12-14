import { useQueryClient } from "@tanstack/react-query";
import { fetchKafkaKpiMetrics } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaInstanceKpiMetricsFetchQuery() {
  const { kafkasFleet } = useApi();
  const queryClient = useQueryClient();

  return (id: string) => {
    const api = kafkasFleet();

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.metrics.kpi({ id }),
      queryFn: async () => {
        return fetchKafkaKpiMetrics(
          (...args) => api.getMetricsByInstantQuery(...args),
          id
        );
      },
    });
  };
}
