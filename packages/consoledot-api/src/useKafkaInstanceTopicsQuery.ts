import { useQueryClient } from "react-query";
import type { FetchKafkaTopicsParams } from "./fetchKafkaTopics";
import { fetchKafkaTopics } from "./fetchKafkaTopics";
import { useTopics } from "./useApi";

export function useKafkaInstanceTopicsQuery() {
  const getTopics = useTopics();
  const queryClient = useQueryClient();

  return ({
    adminUrl,
    ...props
  }: Omit<FetchKafkaTopicsParams, "getTopics"> & { adminUrl: string }) => {
    const api = getTopics(adminUrl);

    return queryClient.fetchQuery({
      queryKey: [
        {
          scope: "kafka-instance",
          entity: "topics",
          adminUrl,
          ...props,
        },
      ],
      queryFn: async () => {
        return fetchKafkaTopics({
          getTopics: (...args) => api.getTopics(...args),
          ...props,
        });
      },
    });
  };
}
