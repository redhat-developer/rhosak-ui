import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import type { TopicSettings } from "@rhoas/kafka-instance-sdk";
import type { Topic } from "ui-models/src/models/topic";
import { convertToKeyValuePairs } from "consoledot-api/src/transformers/topicTransformer";

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

      const convertToNewTopicInput = (topic: Topic) => {
        const { partitions, ...config } = topic;

        const configEntries = convertToKeyValuePairs(config);
        const topicSettings: TopicSettings = {
          numPartitions: partitions.length,
          config: configEntries,
        };
        return topicSettings;
      };

      try {
        await api.updateTopic(topic.name || "", convertToNewTopicInput(topic));
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
