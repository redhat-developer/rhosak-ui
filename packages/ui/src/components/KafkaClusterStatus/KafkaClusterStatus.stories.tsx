import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaClusterStatus } from "./KafkaClusterStatus";

export default {
  component: KafkaClusterStatus,
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
