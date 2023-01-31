import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../useApi";
import type { OffsetValue } from "ui";
import { kafkaQueries } from "../queryKeys";
import { isServiceApiError } from "@rhoas/kafka-management-sdk";

export function useResetConsumerGroupMutation() {
  const { consumerGroups } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function consumerGroupResetOffset(props: {
      instanceId: string;
      adminUrl: string;
      consumerGroupId: string;
      offset: OffsetValue;
      topic: string;
      partitions: number[];
      value?: string;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const {
        instanceId,
        adminUrl,
        consumerGroupId,
        offset,
        topic,
        partitions,
        value,
        onSuccess,
        onError,
      } = props;
      const api = consumerGroups(adminUrl);
      try {
        await api.resetConsumerGroupOffset(consumerGroupId, {
          value,
          offset,
          topics: [{ topic, partitions }],
        });
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
