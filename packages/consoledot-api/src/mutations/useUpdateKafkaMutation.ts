import type { KafkaUpdateRequest } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useUpdateKafkaMutation() {
  const { kafkasFleet } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function kafkaCreateInstance({
      id,
      updates,
    }: {
      id: string;
      updates: KafkaUpdateRequest;
    }) {
      const api = kafkasFleet();
      return api.updateKafkaById(id, updates);
    },
    {
      onSuccess: (_, { id }) => {
        void queryClient.invalidateQueries([
          kafkaQueries.instance.details({ id }),
        ]);
      },
    }
  );
}
