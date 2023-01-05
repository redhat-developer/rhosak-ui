import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchTopicParams } from "../fetchers";
import { fetchTopic } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useTopic(
  params: { id?: string; adminUrl?: string } & Omit<
    FetchTopicParams,
    "getTopic"
  >
) {
  const { refetchInterval } = useApiConfiguration();
  const { topics } = useApi();

  return useQuery({
    queryKey: kafkaQueries.instance.topic(params),
    queryFn: () => {
      if (!params.id) {
        return Promise.reject("Invalid id");
      }
      if (!params.adminUrl) {
        return Promise.reject("Invalid adminUrl");
      }
      const api = topics(params.adminUrl);

      return fetchTopic({
        getTopic: (...args) => api.getTopic(...args),
        ...params,
      });
    },
    enabled:
      Boolean(params.adminUrl) &&
      Boolean(params.id) &&
      Boolean(params.topicName),
    refetchInterval,
  });
}
