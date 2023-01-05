import { useQueryClient } from "@tanstack/react-query";
import { fetchKafkaKpis } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaKpisFetchQuery() {
  const { kafkasFleet } = useApi();
  const queryClient = useQueryClient();

  return (id: string) => {
    const api = kafkasFleet();

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.metrics.kpi({ id }),
      queryFn: async () => {
        return fetchKafkaKpis(
          (...args) => api.getMetricsByInstantQuery(...args),
          id
        );
      },
    });
  };
}
