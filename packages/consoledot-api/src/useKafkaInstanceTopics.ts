import { useQuery } from "@tanstack/react-query";
import { useApi } from "./ApiProvider";
import type { FetchKafkaTopicsParams } from "./fetchKafkaTopics";
import { fetchKafkaTopics } from "./fetchKafkaTopics";
import { kafkaQueries } from "./queryKeys";
import { useTopics } from "./useApi";

export function useKafkaInstanceTopics(
  params: { id?: string; adminUrl?: string } & Omit<
    FetchKafkaTopicsParams,
    "getTopics"
  >
) {
  const { refetchInterval } = useApi();
  const getTopics = useTopics();

  return useQuery({
    queryKey: kafkaQueries.instance.topics(params),
    queryFn: () => {
      if (!params.id) {
        return Promise.reject("Invalid id");
      }
      if (!params.adminUrl) {
        return Promise.reject("Invalid adminUrl");
      }
      const api = getTopics(params.adminUrl);

      return fetchKafkaTopics({
        getTopics: (...args) => api.getTopics(...args),
        ...params,
      });
    },
    enabled: Boolean(params.adminUrl) && Boolean(params.id),
    refetchInterval,
  });
}
