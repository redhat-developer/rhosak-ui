import { useQueryClient } from "@tanstack/react-query";
import type { FetchKafkaTopicsParams } from "./fetchKafkaTopics";
import { fetchKafkaTopics } from "./fetchKafkaTopics";
import { kafkaQueries } from "./queryKeys";
import { useTopics } from "./useApi";

export function useKafkaInstanceTopicsQuery() {
  const getTopics = useTopics();
  const queryClient = useQueryClient();

  return (
    params: Omit<FetchKafkaTopicsParams, "getTopics"> & {
      id: string;
      adminUrl: string;
    }
  ) => {
    const api = getTopics(params.adminUrl);

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.topics(params),
      queryFn: async () => {
        return fetchKafkaTopics({
          getTopics: (...args) => api.getTopics(...args),
          ...params,
        });
      },
    });
  };
}
