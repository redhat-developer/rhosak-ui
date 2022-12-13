import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./ApiProvider";
import type { FetchKafkaInstancesParams } from "./fetchKafkaInstances";
import { fetchKafkaInstances } from "./fetchKafkaInstances";
import { kafkaQueries } from "./queryKeys";
import { useKms } from "./useApi";
import { useKafkaInstanceTransformer } from "./useKafkaInstanceTransformer";

export function useKafkaInstances(
  params: Omit<FetchKafkaInstancesParams, "dataMapper" | "getKafkas">
) {
  const { refetchInterval } = useApi();
  const queryClient = useQueryClient();
  const dataMapper = useKafkaInstanceTransformer();
  const getKms = useKms();
  const api = getKms();

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
