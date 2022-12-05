import { useQueryClient } from "react-query";
import { fetchKafkaInstanceMetrics } from "./fetchKafkaInstanceMetrics";
import { useKms } from "./useApi";

export function useKafkaInstanceMetricsQuery() {
  const getKms = useKms();
  const queryClient = useQueryClient();

  return (id: string, duration: number, interval: number) => {
    const api = getKms();

    return queryClient.fetchQuery({
      queryKey: [
        {
          scope: "kafka-instance",
          entity: "instance-metrics",
          id,
          duration,
          interval,
        },
      ],
      queryFn: async () => {
        return fetchKafkaInstanceMetrics({
          getMetricsByRangeQuery: (...args) =>
            api.getMetricsByRangeQuery(...args),
          kafkaId: id,
          duration,
          interval,
        });
      },
    });
  };
}
