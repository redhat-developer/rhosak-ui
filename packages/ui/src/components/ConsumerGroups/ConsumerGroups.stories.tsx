import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { ConsumerGroup } from "./types";
import { ConsumerGroups } from "./ConsumerGroups";

const consumers: ConsumerGroup[] = [
  {
    consumerGroupId: "consumer-123",
    activeMembers: 1,
    partitionsWithLag: 2,
    state: "CompletingRebalance",
  },
  {
    consumerGroupId: "consumer-233",
    activeMembers: 2,
    partitionsWithLag: 3,
    state: "Stable",
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
