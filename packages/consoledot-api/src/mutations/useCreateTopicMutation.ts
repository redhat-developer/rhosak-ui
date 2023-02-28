import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";
import { Topic } from "ui-models/src/models/topic";
import {
  ConfigEntry,
  NewTopicInput,
  TopicSettings,
} from "@rhoas/kafka-instance-sdk";
import { TopicConfig } from "ui-models/src/models/topic-config";
import { Bytes, Milliseconds } from "ui-models/src/types";

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
      const convertToKeyValuePairs = (inputObj: TopicConfig) => {
        const pairs: ConfigEntry[] = [];
        for (const [key, value] of Object.entries(inputObj)) {
          if (key === "retention.ms") {
            pairs.push({
              key,
              value: (value as Milliseconds).value.toString(),
            });
          } else if (key === "retention.bytes") {
            pairs.push({ key, value: (value as Bytes).value.toString() });
          } else if (key === "cleanup.policy") {
            pairs.push({ key, value: value.toString() });
          }
        }
        return pairs;
      };

      const convertToNewTopicInput = (topic: Topic): NewTopicInput => {
        const { name, partitions, ...config } = topic;

        const configEntries = convertToKeyValuePairs(config);
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
