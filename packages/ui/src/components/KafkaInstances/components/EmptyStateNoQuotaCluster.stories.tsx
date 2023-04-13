import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyStateNoQuotaCluster as EmptyStateNoQuotaClusterComp } from "./EmptyStateNoQuotaCluster";

export default {
  component: EmptyStateNoQuotaClusterComp,
  args: {},
} as ComponentMeta<typeof EmptyStateNoQuotaClusterComp>;

const Template: ComponentStory<typeof EmptyStateNoQuotaClusterComp> = (
  args
) => <EmptyStateNoQuotaClusterComp {...args} />;

export const EmptyStateNoQuotaCluster = Template.bind({});
EmptyStateNoQuotaCluster.args = {};
EmptyStateNoQuotaCluster.parameters = {
  docs: {
    description: {
      story: `OpenShift clusters page - User has no quota`,
    },
  },
};
