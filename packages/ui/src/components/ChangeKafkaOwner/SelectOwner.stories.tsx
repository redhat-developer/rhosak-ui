import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectOwner } from "./SelectOwner";

const accounts = [
  {
    id: "hema_kafka_devexp",
    displayName: "hemahg",
  },
  {
    id: "xxx_kafka_devexp",
    displayName: "owner1",
  },
];
export default {
  component: SelectOwner,
  args: {
    accounts: accounts,
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof SelectOwner>;

const Template: ComponentStory<typeof SelectOwner> = (args) => (
  <SelectOwner {...args} />
);

export const TopicSelectDropdown = Template.bind({});
TopicSelectDropdown.args = {};
