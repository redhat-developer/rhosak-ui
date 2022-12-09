import { useQuery, useQueryClient } from "react-query";
import type { FetchKafkaInstancesParams } from "./fetchKafkaInstances";
import { fetchKafkaInstances } from "./fetchKafkaInstances";
import { useKms } from "./useApi";
import { useKafkaInstanceTransformer } from "./useKafkaInstance";

export function useKafkaInstances(
  params: Omit<FetchKafkaInstancesParams, "dataMapper" | "getKafkas">
) {
  const queryClient = useQueryClient();
  const dataMapper = useKafkaInstanceTransformer();
  const getKms = useKms();
  const api = getKms();

  return useQuery({
    queryKey: [{ scope: "instances", entity: "list", ...params }],
    queryFn: async () => {
      const res = await fetchKafkaInstances({
        getKafkas: (...args) => api.getKafkas(...args),
        dataMapper,
        ...params,
      });
      res.instances.forEach((i) =>
        queryClient.setQueryData(
          [
            {
              scope: "kafka-instances",
              entity: "details",
              id: i.id,
            },
          ],
          i
        )
      );
      return res;
    },
    refetchInterval: 5000,
    cacheTime: 1000 * 5,
  });
}
