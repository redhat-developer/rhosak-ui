import { useQueryClient } from "@tanstack/react-query";
import type { FetchKafkaTopicMessagesParams } from "../fetchers";
import { fetchKafkaTopicMessages } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaTopicMessagesFetchQuery() {
  const { records } = useApi();
  const queryClient = useQueryClient();

  return (
    params: { id: string; adminUrl: string } & Omit<
      FetchKafkaTopicMessagesParams,
      "consumeRecords"
    >
  ) => {
    const api = records(params.adminUrl);

    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.topicMessages(params),
      queryFn: () => {
        if (!params.id) {
          return Promise.reject("Invalid id");
        }
        if (!params.adminUrl) {
          return Promise.reject("Invalid adminUrl");
        }

        return fetchKafkaTopicMessages({
          consumeRecords: (...args) => api.consumeRecords(...args),
          ...params,
        });
      },
    });
  };
}
