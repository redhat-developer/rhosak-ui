import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { sub } from "date-fns";
import { KafkaClusterStatus } from "./KafkaClusterStatus";

export default {
  component: KafkaClusterStatus,
  args: { createdAt: new Date() },
} as ComponentMeta<typeof KafkaClusterStatus>;

const Template: ComponentStory<typeof KafkaClusterStatus> = (
  args,
  { viewMode }
) => {
  const inDocs = viewMode === "docs";
  return (
    <div style={{ paddingTop: inDocs ? 0 : 250 }}>
      <KafkaClusterStatus {...args} />
    </div>
  );
};

export const KafkaClusterAccepted = Template.bind({});
KafkaClusterAccepted.args = { status: "accepted" };

export const CreatingOver15Minutes = Template.bind({});
CreatingOver15Minutes.args = {
  status: "provisioning",
  createdAt: sub(new Date(), { minutes: 16 }),
};

export const CreatingOver30Minutes = Template.bind({});
CreatingOver30Minutes.args = {
  status: "provisioning",
  createdAt: sub(new Date(), { minutes: 31 }),
};

export const KafkaClusterProvisioning = Template.bind({});
KafkaClusterProvisioning.args = { status: "provisioning" };

export const KafkaClusterProvisioned = Template.bind({});
KafkaClusterProvisioned.args = { status: "provisioned" };

export const KafkaClusterFailed = Template.bind({});
KafkaClusterFailed.args = { status: "failed" };

export const KafkaClusterReady = Template.bind({});
KafkaClusterReady.args = { status: "ready" };

export const KafkaClusterDeprovisioning = Template.bind({});
KafkaClusterDeprovisioning.args = { status: "deprovisioning" };

export const KafkaClusterCleanup = Template.bind({});
KafkaClusterCleanup.args = { status: "cleanup" };

export const KafkaClusterWaitingOperator = Template.bind({});
KafkaClusterWaitingOperator.args = { status: "waitingOperator" };
