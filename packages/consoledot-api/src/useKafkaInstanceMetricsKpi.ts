import { useQueryClient } from "react-query";
import { fetchKafkaMetricsKpi } from "./fetchKafkaMetricsKpi";
import { useKms } from "./useApi";

export function useKafkaInstanceMetricsKpiQuery() {
  const getKms = useKms();
  const queryClient = useQueryClient();

  return (id: string) => {
    const api = getKms();

    return queryClient.fetchQuery({
      queryKey: [{ scope: "kafka-instance", entity: "kpi", id }],
      queryFn: async () => {
        if (!id) {
          return Promise.reject("Invalid Kafka instance id");
        }
        return fetchKafkaMetricsKpi(
          (...args) => api.getMetricsByInstantQuery(...args),
          id
        );
      },
    });
  };
}
