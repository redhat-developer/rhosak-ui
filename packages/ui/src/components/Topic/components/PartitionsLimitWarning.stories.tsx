import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { PartitionLimitWarning } from "./PartitionLimitWarning";

export default {
  component: PartitionLimitWarning,
  args: {
    isModalOpen: true,
  },
} as ComponentMeta<typeof PartitionLimitWarning>;

const Template: ComponentStory<typeof PartitionLimitWarning> = (args) => (
  <PartitionLimitWarning {...args} />
);

export const CreateTopicWarning = Template.bind({});
CreateTopicWarning.args = { isCreate: true };
CreateTopicWarning.parameters = {
  docs: {
    description: {
      story: `A modal when creating a topic that has reached or exceeded available number of partitions`,
    },
  },
};

export const EditTopicWarning = Template.bind({});
EditTopicWarning.args = { isCreate: false };
EditTopicWarning.parameters = {
  docs: {
    description: {
      story: `A modal when editing a topic that shows up when user increases the number of partitions`,
    },
  },
};
