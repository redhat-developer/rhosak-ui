import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { ConsumerGroup } from "ui-models/src/models/consumer-group";
import { ConsumerGroups } from "./ConsumerGroups";

const consumers: ConsumerGroup[] = [
  {
    groupId: "consumer-123",
    activeConsumers: 1,
    laggingPartitions: 2,
    state: "CompletingRebalance",
    consumers: [],
  },
  {
    groupId: "consumer-233",
    activeConsumers: 2,
    laggingPartitions: 3,
    state: "Stable",
    consumers: [],
  },
];

export default {
  component: ConsumerGroups,
  args: {
    consumers: consumers,
    consumerName: [],
  },
} as ComponentMeta<typeof ConsumerGroups>;

const Template: ComponentStory<typeof ConsumerGroups> = (args) => (
  <ConsumerGroups {...args} />
);

export const DefaultConsumerGroupTable = Template.bind({});
DefaultConsumerGroupTable.args = {};

export const NoConsumers = Template.bind({});
NoConsumers.args = {
  consumers: [],
  consumerName: [],
};
