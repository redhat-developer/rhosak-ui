import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyStateNoClusterInstance as EmptyStateNoClusterInstanceComp } from "./EmptyStateNoClusterInstance";

export default {
  component: EmptyStateNoClusterInstanceComp,
  args: {},
} as ComponentMeta<typeof EmptyStateNoClusterInstanceComp>;

const Template: ComponentStory<typeof EmptyStateNoClusterInstanceComp> = (
  args
) => <EmptyStateNoClusterInstanceComp {...args} />;

export const EmptyStateNoClusterInstance = Template.bind({});
EmptyStateNoClusterInstance.args = {};

EmptyStateNoClusterInstance.parameters = {
  docs: {
    description: {
      story: `Kafka instances page - User has quota but no OpenShift clusters`,
    },
  },
};
