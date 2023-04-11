import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyStateNoClusters as EmptyStateNoClustersComp } from "./EmptyStateNoClusters";

export default {
  component: EmptyStateNoClustersComp,
  args: {},
} as ComponentMeta<typeof EmptyStateNoClustersComp>;

const Template: ComponentStory<typeof EmptyStateNoClustersComp> = (args) => (
  <EmptyStateNoClustersComp {...args} />
);

export const EmptyStateNoClusters = Template.bind({});
EmptyStateNoClusters.args = {};

EmptyStateNoClusters.parameters = {
  docs: {
    description: {
      story: `OpenShift clusters page - User has quota but no OpenShift clusters`,
    },
  },
};
