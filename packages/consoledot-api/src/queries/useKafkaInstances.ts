import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchKafkaInstancesParams } from "../fetchers";
import { fetchKafkaInstances } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import { useKafkaInstanceTransformer } from "./useKafkaInstanceTransformer";

export function useKafkaInstances(
  params: Omit<FetchKafkaInstancesParams, "dataMapper" | "getKafkas">
) {
  const { refetchInterval } = useApiConfiguration();
  const queryClient = useQueryClient();
  const dataMapper = useKafkaInstanceTransformer();
  const { kafkasFleet } = useApi();
  const api = kafkasFleet();

  return useQuery({
    queryKey: kafkaQueries.list(params),
    queryFn: async () => {
      const res = await fetchKafkaInstances({
        getKafkas: (...args) => api.getKafkas(...args),
        dataMapper,
        ...params,
      });
      res.instances.forEach((i) =>
        queryClient.setQueryData(kafkaQueries.instance.details({ id: i.id }), i)
      );
      return res;
    },
    refetchInterval,
  });
}
