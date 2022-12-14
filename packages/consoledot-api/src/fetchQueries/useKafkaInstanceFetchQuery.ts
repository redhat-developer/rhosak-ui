import { useQueryClient } from "@tanstack/react-query";
import { useKafkaInstanceTransformer } from "../queries";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaInstanceFetchQuery() {
  const queryClient = useQueryClient();
  const dataMapper = useKafkaInstanceTransformer();
  const { kafkasFleet } = useApi();
  return async (id: string) => {
    const api = kafkasFleet();
    return queryClient.fetchQuery({
      queryKey: kafkaQueries.instance.details({ id }),
      queryFn: async () => {
        const instance = await api.getKafkaById(id);
        return dataMapper(instance.data);
      },
    });
  };
}
