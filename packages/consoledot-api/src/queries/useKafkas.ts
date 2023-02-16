import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchKafkasParams } from "../fetchers";
import { fetchKafkas } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import { useDedicatedClusters } from "./useDedicatedClusters";
import { useKafkaInstanceTransformer } from "./useKafkaInstanceTransformer";

export function useKafkas(
  params: Omit<FetchKafkasParams, "dataMapper" | "getKafkas" | "clusterIds">
) {
  const { refetchInterval } = useApiConfiguration();
  const { data, isError } = useDedicatedClusters();
  const queryClient = useQueryClient();
  const dataMapper = useKafkaInstanceTransformer();
  const { kafkasFleet } = useApi();
  const api = kafkasFleet();
  const clusterIds = data?.clusters.map((c) => c.id);

  return useQuery({
    queryKey: kafkaQueries.list({ ...params, clusterIds }),
    queryFn: async () => {
      const res = await fetchKafkas({
        getKafkas: (...args) => api.getKafkas(...args),
        dataMapper,
        ...params,
        clusterIds,
      });
      res.instances.forEach((i) =>
        queryClient.setQueryData(kafkaQueries.instance.details({ id: i.id }), i)
      );
      return res;
    },
    enabled: Boolean(clusterIds) || isError,
    refetchInterval,
  });
}
