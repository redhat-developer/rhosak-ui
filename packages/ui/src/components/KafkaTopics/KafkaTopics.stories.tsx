import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { KafkaTopic } from "../../types";
import { KafkaTopics } from "./KafkaTopics";

const topics: KafkaTopic[] = [
  {
    name: "foo",
    partitionsCount: 1,
    retentionBytes: "-1",
    retentionTime: "	86400000 ms",
  },
  {
    name: "bar",
    partitionsCount: 3,
    retentionBytes: "1099511600000 bytes",
    retentionTime: "1500000",
  },
  {
    name: "buzz",
    partitionsCount: 2,
    retentionBytes: "80000 bytes",
    retentionTime: "-1",
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
