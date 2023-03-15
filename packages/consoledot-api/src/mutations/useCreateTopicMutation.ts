import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import type { NewTopicInput } from "@rhoas/kafka-instance-sdk";
import { convertToTopicSettings } from "consoledot-api/src/transformers/topicTransformer";
import type { TopicForm } from "ui";

export function useCreateTopicMutation() {
  const { topics } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function createTopic(props: {
      instanceId: string;
      adminUrl: string;
      topic: TopicForm;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const { adminUrl, topic, onSuccess, onError } = props;
      const api = topics(adminUrl);

      const createTopic = (topic: TopicForm): NewTopicInput => {
        const { name } = topic;
        const topicSettings = convertToTopicSettings(topic);
        return {
          name,
          settings: topicSettings,
        };
      };

      try {
        await api.createTopic(createTopic(topic));
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
