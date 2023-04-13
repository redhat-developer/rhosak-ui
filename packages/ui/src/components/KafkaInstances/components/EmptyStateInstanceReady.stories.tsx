import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyStateInstanceReady as EmptyStateInstanceReadyComp } from "./EmptyStateInstanceReady";

export default {
  component: EmptyStateInstanceReadyComp,
  args: {},
} as ComponentMeta<typeof EmptyStateInstanceReadyComp>;

const Template: ComponentStory<typeof EmptyStateInstanceReadyComp> = (args) => (
  <EmptyStateInstanceReadyComp {...args} />
);

export const EmptyStateInstanceReady = Template.bind({});
EmptyStateInstanceReady.args = {};
EmptyStateInstanceReady.parameters = {
  docs: {
    description: {
      story: `Kafka instances page - User has quota and OpenShift clusters`,
    },
  },
};
