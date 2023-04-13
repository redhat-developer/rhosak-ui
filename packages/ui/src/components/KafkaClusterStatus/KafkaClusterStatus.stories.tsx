import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaClusterStatus } from "./KafkaClusterStatus";

export default {
  component: KafkaClusterStatus,
  args: { registeringStep: "cluster-accepted" },
} as ComponentMeta<typeof KafkaClusterStatus>;

const Template: ComponentStory<typeof KafkaClusterStatus> = (args) => {
  return <KafkaClusterStatus {...args} />;
};

export const KafkaClusterReady = Template.bind({});
KafkaClusterReady.args = { status: "ready" };

KafkaClusterReady.parameters = {
  docs: {
    description: {
      story: `Kafka cluster is ready`,
    },
  },
};

export const KafkaClusterRegisteringStep1 = Template.bind({});
KafkaClusterRegisteringStep1.args = {
  status: "registering",
  registeringStep: "cluster-accepted",
};

KafkaClusterRegisteringStep1.parameters = {
  docs: {
    description: {
      story: `Kafka cluster is being created and the progress stepper is at step 1`,
    },
  },
};

export const KafkaClusterRegisteringStep2 = Template.bind({});
KafkaClusterRegisteringStep2.args = {
  status: "registering",
  registeringStep: "provisioning",
};

KafkaClusterRegisteringStep2.parameters = {
  docs: {
    description: {
      story: `Kafka cluster is being created and the progress stepper is at step 2`,
    },
  },
};

export const KafkaClusterRegisteringStep3 = Template.bind({});
KafkaClusterRegisteringStep3.args = {
  status: "registering",
  registeringStep: "provisioned",
};

KafkaClusterRegisteringStep3.parameters = {
  docs: {
    description: {
      story: `Kafka cluster is being created and the progress stepper is at step 3`,
    },
  },
};

export const KafkaClusterRegisteringStep4 = Template.bind({});
KafkaClusterRegisteringStep4.args = {
  status: "registering",
  registeringStep: "preparing",
};

KafkaClusterRegisteringStep4.parameters = {
  docs: {
    description: {
      story: `Kafka cluster is being created and the progress stepper is at step 4`,
    },
  },
};

export const KafkaClusterFailed = Template.bind({});
KafkaClusterFailed.args = { status: "failed" };

KafkaClusterReady.parameters = {
  docs: {
    description: {
      story: `Kafka cluster failed to create`,
    },
  },
};

export const KafkaClusterUnregistering = Template.bind({});
KafkaClusterUnregistering.args = { status: "unregistering" };

KafkaClusterUnregistering.parameters = {
  docs: {
    description: {
      story: `Kafka cluster is being unregistered`,
    },
  },
};
