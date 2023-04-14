import type { ComponentMeta } from "@storybook/react";
import { CreateDedicatedKafkaInstance } from "../../CreateDedicatedKafkaInstance";
import {
  argTypes,
  defaultStoryArgs,
  parameters,
  sampleSubmit,
  Template,
} from "./storiesHelpers";

export default {
  component: CreateDedicatedKafkaInstance,
  args: defaultStoryArgs,
  argTypes,
  parameters,
} as ComponentMeta<typeof CreateDedicatedKafkaInstance>;

export const LoadingData = Template.bind({});
LoadingData.args = {
  apiLatency: 999999,
};

export const CreationInProgress = Template.bind({});
CreationInProgress.args = {
  onCreate: () => {
    // Doing nothing to showcase the loading
  },
};
CreationInProgress.play = sampleSubmit;
