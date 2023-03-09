import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { KafkaSampleCode } from "./KafkaSampleCode";

export default {
  component: KafkaSampleCode,
  args: {
    kafkaBootstrapUrl: "hema-test-c-k-l-kafka-stage.rhcloud.com:443",
    tokenEndpointUrl:
      "https://identify.api.stage.openshift.com/auth/realms/rhoas/protocol/openid-connect/token",
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof KafkaSampleCode>;

const Template: ComponentStory<typeof KafkaSampleCode> = (args) => (
  <KafkaSampleCode {...args} />
);

export const SampleCodeSnippet = Template.bind({});

export const SampleCodeSnippetWhenTokenEndpointUrlisUndefined = Template.bind(
  {}
);
SampleCodeSnippetWhenTokenEndpointUrlisUndefined.args = {
  tokenEndpointUrl: undefined,
};
