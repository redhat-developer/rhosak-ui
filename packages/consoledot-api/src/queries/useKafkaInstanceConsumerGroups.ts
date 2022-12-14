import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchKafkaConsumerGroupsParams } from "../fetchers";
import { fetchKafkaConsumerGroups } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaInstanceConsumerGroups(
  params: { id?: string; adminUrl?: string } & Omit<
    FetchKafkaConsumerGroupsParams,
    "getConsumerGroups"
  >
) {
  const { refetchInterval } = useApiConfiguration();
  const { consumerGroups } = useApi();

  return useQuery({
    queryKey: kafkaQueries.instance.consumerGroups(params),
    queryFn: () => {
      if (!params.id) {
        return Promise.reject("Invalid id");
      }
      if (!params.adminUrl) {
        return Promise.reject("Invalid adminUrl");
      }
      const api = consumerGroups(params.adminUrl);

      return fetchKafkaConsumerGroups({
        getConsumerGroups: (...args) => api.getConsumerGroups(...args),
        ...params,
      });
    },
    enabled: Boolean(params.adminUrl) && Boolean(params.id),
    refetchInterval,
  });
}
