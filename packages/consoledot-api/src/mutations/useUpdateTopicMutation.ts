import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import { convertToTopicSettings } from "consoledot-api/src/transformers/topicTransformer";
import type { TopicForm } from "ui";

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
      topic: TopicForm;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const api = topics(adminUrl);

      const updateTopic = (topic: TopicForm) => {
        const topicSettings = convertToTopicSettings(topic);
        return topicSettings;
      };

      try {
        await api.updateTopic(topic.name || "", updateTopic(topic));
        onSuccess();
      } catch (error) {
        if (isServiceApiError(error)) {
          const message = error?.response?.data.reason;
          const { code } = error?.response?.data || {};

          onError(code || "?", message || "?");
        }
      }
    },
    {
      onSuccess: (_, { adminUrl, instanceId }) => {
        void queryClient.removeQueries([
          kafkaQueries.instance._root({
            id: instanceId,
            adminUrl,
          }),
        ]);
      },
    }
  );
}
