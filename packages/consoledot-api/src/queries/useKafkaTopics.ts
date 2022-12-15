import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchKafkaTopicsParams } from "../fetchers";
import { fetchKafkaTopics } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaTopics(
  params: { id?: string; adminUrl?: string } & Omit<
    FetchKafkaTopicsParams,
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

      return fetchKafkaTopics({
        getTopics: (...args) => api.getTopics(...args),
        ...params,
      });
    },
    enabled: Boolean(params.adminUrl) && Boolean(params.id),
    refetchInterval,
  });
}
