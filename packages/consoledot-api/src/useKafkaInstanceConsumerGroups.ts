import { useQuery } from "@tanstack/react-query";
import { useApi } from "./ApiProvider";
import type { FetchKafkaConsumerGroupsParams } from "./fetchKafkaConsumerGroups";
import { fetchKafkaConsumerGroups } from "./fetchKafkaConsumerGroups";
import { kafkaQueries } from "./queryKeys";
import { useConsumerGroups } from "./useApi";

export function useKafkaInstanceConsumerGroups(
  params: { id?: string; adminUrl?: string } & Omit<
    FetchKafkaConsumerGroupsParams,
    "getConsumerGroups"
  >
) {
  const { refetchInterval } = useApi();
  const getConsumerGroups = useConsumerGroups();

  return useQuery({
    queryKey: kafkaQueries.instance.consumerGroups(params),
    queryFn: () => {
      if (!params.id) {
        return Promise.reject("Invalid id");
      }
      if (!params.adminUrl) {
        return Promise.reject("Invalid adminUrl");
      }
      const api = getConsumerGroups(params.adminUrl);

      return fetchKafkaConsumerGroups({
        getConsumerGroups: (...args) => api.getConsumerGroups(...args),
        ...params,
      });
    },
    enabled: Boolean(params.adminUrl) && Boolean(params.id),
    refetchInterval,
  });
}
