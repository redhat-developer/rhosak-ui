import { useQueryClient } from "@tanstack/react-query";
import type { FetchTopicsParams } from "../fetchers";
import { fetchTopics } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useTopicsFetchQuery() {
  const { topics } = useApi();
  const queryClient = useQueryClient();

  return (
    params: Omit<FetchTopicsParams, "getTopics"> & {
      id: string;
      adminUrl: string;
    }
  ) => {
    const api = topics(params.adminUrl);

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.topics(params),
      queryFn: async () => {
        return fetchTopics({
          getTopics: (...args) => api.getTopics(...args),
          ...params,
        });
      },
    });
  };
}
