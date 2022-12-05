import { useQueryClient } from "react-query";
import { fetchKafkaTopicMetrics } from "./fetchKafkaTopicMetrics";
import { useKms } from "./useApi";

export function useKafkaInstanceTopicMetricsQuery() {
  const getKms = useKms();
  const queryClient = useQueryClient();

  return (
    id: string,
    duration: number,
    interval: number,
    selectedTopic: string | undefined
  ) => {
    const api = getKms();

    return queryClient.fetchQuery({
      queryKey: [
        {
          scope: "kafka-instance",
          entity: "topic-metrics",
          id,
          duration,
          interval,
          selectedTopic,
        },
      ],
      queryFn: async () => {
        return fetchKafkaTopicMetrics({
          getMetricsByRangeQuery: (...args) =>
            api.getMetricsByRangeQuery(...args),
          kafkaId: id,
          duration,
          interval,
          selectedTopic,
        });
      },
    });
  };
}
