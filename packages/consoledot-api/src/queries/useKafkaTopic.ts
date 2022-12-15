import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchKafkaTopicParams } from "../fetchers";
import { fetchKafkaTopic } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaTopic(
  params: { id?: string; adminUrl?: string } & Omit<
    FetchKafkaTopicParams,
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

      return fetchKafkaTopic({
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
