import { CreateKafkaInstance } from "../../CreateKafkaInstance";
import type { StoryMeta } from "./storiesHelpers";
import {
  argTypes,
  defaultStoryArgs,
  parameters,
  Template,
} from "./storiesHelpers";

export default {
  component: CreateKafkaInstance,
  args: defaultStoryArgs,
  argTypes,
  parameters,
} as StoryMeta;

export const QuotaAvailableOnFormLoad = Template.bind({});
QuotaAvailableOnFormLoad.storyName = "Quota Available - Dedicated";

export const TrialAvailableOnFormLoad = Template.bind({});
TrialAvailableOnFormLoad.storyName = "Quota Available - Trial";
TrialAvailableOnFormLoad.args = {
  apiPlan: "developer",
  apiTrialScenario: "available",
};

export const OutOfQuotaOnFormLoad = Template.bind({});
OutOfQuotaOnFormLoad.storyName = "Out of Quota - Dedicated";
OutOfQuotaOnFormLoad.args = {
  apiDedicatedScenario: "out-of-quota",
};

export const TrialUnavailableOnFormLoad = Template.bind({});
TrialUnavailableOnFormLoad.storyName = "Trial Unavailable - Trial";
TrialUnavailableOnFormLoad.args = {
  apiPlan: "developer",
  apiTrialScenario: "unavailable",
};

export const TrialUsedOnFormLoad = Template.bind({});
TrialUsedOnFormLoad.storyName = "Over Quota - Trial";
TrialUsedOnFormLoad.args = {
  apiPlan: "developer",
  apiTrialScenario: "used",
};

export const ErrorOnFormLoad = Template.bind({});
ErrorOnFormLoad.storyName = "Generic Error";
ErrorOnFormLoad.args = {
  apiSimulateBackendError: true,
};

export const UnableToRetrieveSizes = Template.bind({});
UnableToRetrieveSizes.storyName = "No sizes returned from API - Dedicated";
UnableToRetrieveSizes.args = {
  apiSizes: "error",
};
UnableToRetrieveSizes.parameters = {
  docs: {
    description: {
      story: `If for any reason we don't get any size at all, we still provide the user with an informative message.`,
    },
  },
};

export const GotEmptySizes = Template.bind({});
GotEmptySizes.storyName = "Empty list of sizes returned from API - Dedicated";
GotEmptySizes.args = {
  apiSizes: "no-sizes",
};
GotEmptySizes.parameters = {
  docs: {
    description: {
      story: `If for any reason we don't get any size at all, we still provide the user with an informative message.`,
    },
  },
};
