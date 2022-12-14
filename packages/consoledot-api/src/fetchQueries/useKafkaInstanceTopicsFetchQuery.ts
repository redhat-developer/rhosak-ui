import { useQueryClient } from "@tanstack/react-query";
import type { FetchKafkaTopicsParams } from "../fetchers";
import { fetchKafkaTopics } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaInstanceTopicsFetchQuery() {
  const { topics } = useApi();
  const queryClient = useQueryClient();

  return (
    params: Omit<FetchKafkaTopicsParams, "getTopics"> & {
      id: string;
      adminUrl: string;
    }
  ) => {
    const api = topics(params.adminUrl);

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
