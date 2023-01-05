import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchKafkasParams } from "../fetchers";
import { fetchKafkas } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import { useKafkaInstanceTransformer } from "./useKafkaInstanceTransformer";

export function useKafkas(
  params: Omit<FetchKafkasParams, "dataMapper" | "getKafkas">
) {
  const { refetchInterval } = useApiConfiguration();
  const queryClient = useQueryClient();
  const dataMapper = useKafkaInstanceTransformer();
  const { kafkasFleet } = useApi();
  const api = kafkasFleet();

  return useQuery({
    queryKey: kafkaQueries.list(params),
    queryFn: async () => {
      const res = await fetchKafkas({
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
