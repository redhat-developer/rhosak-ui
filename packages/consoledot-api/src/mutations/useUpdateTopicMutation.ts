import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import type { Topic } from "@rhoas/kafka-instance-sdk";

export function useUpdateTopicMutation() {
  const { topics } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function UpdateTopicMutation({
      adminUrl,
      topic,
      onSuccess,
      onError,
    }: {
      instanceId: string;
      adminUrl: string;
      topic: Topic;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const api = topics(adminUrl);
      try {
        await api.createTopic({
          name: topic.name || "",
          settings: {
            numPartitions: topic.partitions?.length,
            config: topic.config,
          },
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
