import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { Topic } from "ui-models/src/models/topic";
import type { TopicConfig } from "ui-models/src/models/topic-config";
import { KafkaTopics } from "./KafkaTopics";

const topics: Topic[] = [
  {
    name: "foo",
    partitions: 1,
    config: {
      "retention.bytes": { type: "bytes", value: BigInt("-1") },
      "retention.ms": { type: "ms", value: BigInt("86400000") },
    } as TopicConfig,
  },
  {
    name: "bar",
    partitions: 3,
    config: {
      "retention.bytes": { type: "bytes", value: BigInt("1099511600000") },
      "retention.ms": { type: "ms", value: BigInt("1500000") },
    } as TopicConfig,
  },
  {
    name: "buzz",
    partitions: 2,
    config: {
      "retention.bytes": { type: "bytes", value: BigInt("80000") },
      "retention.ms": { type: "ms", value: BigInt("-1") },
    } as TopicConfig,
  },
];

export default {
  component: KafkaTopics,
  args: {
    getUrlFortopic: () => "",
    topics: topics,
    topicName: [],
  },
} as ComponentMeta<typeof KafkaTopics>;

const Template: ComponentStory<typeof KafkaTopics> = (args) => (
  <KafkaTopics {...args} />
);

export const WithTopics = Template.bind({});
WithTopics.args = {};

export const NoTopics = Template.bind({});
NoTopics.args = {
  topics: [],
  topicName: ["boo", "foo"],
};
