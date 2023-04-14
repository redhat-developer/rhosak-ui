import { expect } from "@storybook/jest";
import type { ComponentMeta } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
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

export const OverQuotaOnFormSubmit = Template.bind({});
OverQuotaOnFormSubmit.storyName = "Over Quota - Dedicated";
OverQuotaOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("insufficient-quota"),
};
OverQuotaOnFormSubmit.play = sampleSubmit;

export const TrialUnavailableOnFormSubmit = Template.bind({});
TrialUnavailableOnFormSubmit.storyName = "Trial Unavailable - Trial";
TrialUnavailableOnFormSubmit.args = {
  apiPlan: "developer",
  apiTrialScenario: "available",
  onCreate: (_data, _onSuccess, onError) => onError("developer-unavailable"),
};
TrialUnavailableOnFormSubmit.play = sampleSubmit;

export const NameTakenOnFormSubmit = Template.bind({});
NameTakenOnFormSubmit.storyName = "Name Taken";
NameTakenOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("name-taken"),
};
NameTakenOnFormSubmit.play = sampleSubmit;

export const GenericErrorOnFormSubmit = Template.bind({});
GenericErrorOnFormSubmit.storyName = "Generic Error - Dedicated";
GenericErrorOnFormSubmit.args = {
  onCreate: (_data, _onSuccess, onError) => onError("unknown"),
};
GenericErrorOnFormSubmit.play = sampleSubmit;

export const FormErrorsCantSubmit = Template.bind({});
FormErrorsCantSubmit.storyName = "Errors In Form - Dedicated";
FormErrorsCantSubmit.args = {};
FormErrorsCantSubmit.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await expect(canvas.getByLabelText("Name *")).toBeEnabled();
  });

  await userEvent.type(await canvas.findByLabelText("Name *"), "%3-foo-;");

  await userEvent.click(
    await canvas.findByTestId("modalCreateKafka-buttonSubmit")
  );
};
