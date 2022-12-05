import { useQueryClient } from "react-query";
import { fetchKafkaTopics } from "./fetchKafkaTopics";
import { useTopics } from "./useApi";

export function useKafkaInstanceTopicsQuery() {
  const getTopics = useTopics();
  const queryClient = useQueryClient();

  return (adminUrl: string) => {
    const api = getTopics(adminUrl);

    return queryClient.fetchQuery({
      queryKey: [
        {
          scope: "kafka-instance",
          entity: "topics",
          adminUrl,
        },
      ],
      queryFn: async () => {
        return fetchKafkaTopics((...args) => api.getTopics(...args));
      },
    });
  };
}
