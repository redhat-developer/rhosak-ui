import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyStateNoQuotaInstance as EmptyStateNoQuotaInstanceComp } from "./EmptyStateNoQuotaInstance";

export default {
  component: EmptyStateNoQuotaInstanceComp,
  args: {},
} as ComponentMeta<typeof EmptyStateNoQuotaInstanceComp>;

const Template: ComponentStory<typeof EmptyStateNoQuotaInstanceComp> = (
  args
) => <EmptyStateNoQuotaInstanceComp {...args} />;

export const EmptyStateNoQuotaInstance = Template.bind({});
EmptyStateNoQuotaInstance.args = {};
EmptyStateNoQuotaInstance.parameters = {
  docs: {
    description: {
      story: `Kafka instances page - User has no quota`,
    },
  },
};
