import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import type { FetchConsumerGroupParams } from "../fetchers";
import { fetchConsumerGroup } from "../fetchers";

export function useConsumerGroup(
  params: { id?: string; adminUrl?: string } & Omit<
    FetchConsumerGroupParams,
    "getConsumerGroupById"
  >,
  suspense = false
) {
  const { refetchInterval } = useApiConfiguration();
  const { consumerGroups } = useApi();

  return useQuery({
    queryKey: kafkaQueries.instance.consumerGroup(params),
    queryFn: () => {
      if (!params.id) {
        return Promise.reject("Invalid id");
      }
      if (!params.adminUrl) {
        return Promise.reject("Invalid adminUrl");
      }
      const api = consumerGroups(params.adminUrl);

      return fetchConsumerGroup({
        getConsumerGroupById: (...args) => api.getConsumerGroupById(...args),
        ...params,
      });
    },
    enabled:
      Boolean(params.adminUrl) &&
      Boolean(params.id) &&
      Boolean(params.consumerGroupId),
    refetchInterval,
    suspense,
  });
}
