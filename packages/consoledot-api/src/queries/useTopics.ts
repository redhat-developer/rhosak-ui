import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchTopicsParams } from "../fetchers";
import { fetchTopics } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useTopics(
  params: { id?: string; adminUrl?: string } & Omit<
    FetchTopicsParams,
    "getTopics"
  >
) {
  const { refetchInterval } = useApiConfiguration();
  const { topics } = useApi();

  return useQuery({
    queryKey: kafkaQueries.instance.topics(params),
    queryFn: () => {
      if (!params.id) {
        return Promise.reject("Invalid id");
      }
      if (!params.adminUrl) {
        return Promise.reject("Invalid adminUrl");
      }
      const api = topics(params.adminUrl);

      return fetchTopics({
        getTopics: (...args) => api.getTopics(...args),
        ...params,
      });
    },
    enabled: Boolean(params.adminUrl) && Boolean(params.id),
    refetchInterval,
  });
}
