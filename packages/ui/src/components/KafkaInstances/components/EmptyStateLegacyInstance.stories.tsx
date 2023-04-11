import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyStateLegacyInstance as EmptyStateLegacyInstanceComp } from "./EmptyStateLegacyInstance";

export default {
  component: EmptyStateLegacyInstanceComp,
  args: {},
} as ComponentMeta<typeof EmptyStateLegacyInstanceComp>;

const Template: ComponentStory<typeof EmptyStateLegacyInstanceComp> = (
  args
) => <EmptyStateLegacyInstanceComp {...args} />;

export const EmptyStateLegacyInstance = Template.bind({});
EmptyStateLegacyInstance.args = {};
EmptyStateLegacyInstance.parameters = {
  docs: {
    description: {
      story: `Kafka instances page - user has legacy quota only`,
    },
  },
};
