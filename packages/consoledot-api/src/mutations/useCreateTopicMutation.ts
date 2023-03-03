import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import type { Topic } from "ui-models/src/models/topic";
import type { NewTopicInput, TopicSettings } from "@rhoas/kafka-instance-sdk";
import type { UserEditable } from "consoledot-api/src/transformers/topicTransformer";
import { convertToKeyValuePairs } from "consoledot-api/src/transformers/topicTransformer";

export function useCreateTopicMutation() {
  const { topics } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function createTopic(props: {
      instanceId: string;
      adminUrl: string;
      topic: Topic;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const { adminUrl, topic, onSuccess, onError } = props;
      const api = topics(adminUrl);

      const convertToNewTopicInput = (topic: Topic): NewTopicInput => {
        const { name, partitions, ...config } = topic;
        const editProperties: UserEditable = {
          "retention.bytes": config["retention.bytes"],
          "retention.ms": config["retention.ms"],
          "cleanup.policy": config["cleanup.policy"],
        };

        const configEntries = convertToKeyValuePairs(editProperties);
        const topicSettings: TopicSettings = {
          numPartitions: partitions.length,
          config: configEntries,
        };
        return {
          name,
          settings: topicSettings,
        };
      };

      try {
        await api.createTopic(convertToNewTopicInput(topic));
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
