import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries, masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaDeleteInstanceMutation() {
  const { kafkasFleet } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function kafkaCreateInstance(props: {
      id: string;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const { id, onSuccess, onError } = props;
      const api = kafkasFleet();
      try {
        await api.deleteKafkaById(id, true);
        onSuccess();
      } catch (error) {
        if (isServiceApiError(error)) {
          const message = error?.message;
          const { code } = error?.response?.data || {};

          onError(code || "?", message);
        }
      }
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([kafkaQueries._root()]);
        void queryClient.invalidateQueries([masQueries.quota._root()]);
      },
    }
  );
}
