import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import { useKafkaInstanceTransformer } from "./useKafkaInstanceTransformer";

export function useKafkaInstance(id: string | undefined) {
  const { refetchInterval } = useApiConfiguration();
  const dataMapper = useKafkaInstanceTransformer();
  const { kafkasFleet } = useApi();
  const api = kafkasFleet();

  return useQuery({
    enabled: Boolean(id),
    queryKey: kafkaQueries.instance.details({ id }),
    queryFn: async () => {
      if (!id) {
        return Promise.reject("Invalid Kafka instance id");
      }
      const instance = await api.getKafkaById(id);
      return dataMapper(instance.data);
    },
    refetchInterval,
  });
}
