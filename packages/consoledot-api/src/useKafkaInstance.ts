import { useQuery, useQueryClient } from "react-query";
import { useApi } from "./ApiProvider";
import { kafkaQueries } from "./queryKeys";
import { useKms } from "./useApi";
import { useKafkaInstanceTransformer } from "./useKafkaInstanceTransformer";

export function useKafkaInstance(id: string | undefined) {
  const { refetchInterval } = useApi();
  const dataMapper = useKafkaInstanceTransformer();
  const getKms = useKms();
  const api = getKms();

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
    refetchInterval
  });
}

export function useKafkaInstanceQuery() {
  const queryClient = useQueryClient();
  const dataMapper = useKafkaInstanceTransformer();
  const getKms = useKms();
  return async (id: string) => {
    const api = getKms();
    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.details({ id }),
      queryFn: async () => {
        const instance = await api.getKafkaById(id);
        return dataMapper(instance.data);
      },
    });
  };
}

