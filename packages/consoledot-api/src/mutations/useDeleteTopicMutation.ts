import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useDeleteTopicMutation() {
  const { topics } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function kafkaCreateInstance({
      adminUrl,
      name,
      onSuccess,
      onError,
    }: {
      instanceId: string;
      adminUrl: string;
      name: string;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const api = topics(adminUrl);
      try {
        await api.deleteTopic(name);
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
      onSuccess: (_, { adminUrl, instanceId }) => {
        void queryClient.invalidateQueries([
          kafkaQueries.instance._root({
            id: instanceId,
            adminUrl,
          }),
        ]);
      },
    }
  );
}
