import type { ComponentMeta } from "@storybook/react";
import { CreateDedicatedKafkaInstance as CreateDedicatedKafkaInstanceComponent } from "./CreateDedicatedKafkaInstance";
import {
  argTypes,
  defaultStoryArgs,
  parameters,
  Template,
} from "./Stories/Dedicated/storiesHelpers";

export default {
  component: CreateDedicatedKafkaInstanceComponent,
  args: defaultStoryArgs,
  argTypes,
  parameters,
} as ComponentMeta<typeof CreateDedicatedKafkaInstanceComponent>;

export const CreateDedicatedKafkaInstance = Template.bind({});
