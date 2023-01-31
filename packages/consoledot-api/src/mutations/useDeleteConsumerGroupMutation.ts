import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useDeleteConsumerGroupMutation() {
  const { consumerGroups } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function deleteConsumerGroup(props: {
      instanceId: string;
      adminUrl: string;
      consumerGroupId: string;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const { instanceId, adminUrl, consumerGroupId, onSuccess, onError } =
        props;
      const api = consumerGroups(adminUrl);
      try {
        await api.deleteConsumerGroupById(consumerGroupId);
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
