import { useQueryClient } from "@tanstack/react-query";
import type { FetchMessagesParams } from "../fetchers";
import { fetchMessages } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useMessagesFetchQuery() {
  const { records } = useApi();
  const queryClient = useQueryClient();

  return (
    params: { id: string; adminUrl: string } & Omit<
      FetchMessagesParams,
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

        return fetchMessages({
          consumeRecords: (...args) => api.consumeRecords(...args),
          ...params,
        });
      },
    });
  };
}
