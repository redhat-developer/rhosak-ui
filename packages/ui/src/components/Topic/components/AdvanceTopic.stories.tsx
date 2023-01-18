import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { CreateTopicWizard } from "./CreateTopicWizard";
import { constantValues } from "./storiesHelpers";

export default {
  component: CreateTopicWizard,
  args: {
    isSwitchChecked: true,
    initialFieldsValue: {
      name: "",
      partitions: [{ partition: 1, id: 1 }],
      "cleanup.policy": "delete",
      "delete.retention.ms": { type: "ms", value: BigInt("1") },
      "max.compaction.lag.ms": { type: "ms", value: BigInt("1") },
      "max.message.bytes": { type: "bytes", value: BigInt("9") },
      "message.downconversion.enable": false,
      "message.timestamp.difference.max.ms": {
        type: "ms",
        value: BigInt("1"),
      },
      "message.timestamp.type": "CreateTime",
      "min.compaction.lag.ms": { type: "ms", value: BigInt("1") },
      "retention.bytes": { type: "bytes", value: BigInt("9") },
      "retention.ms": { type: "ms", value: BigInt("1") },
      "segment.bytes": { type: "bytes", value: BigInt("9") },
      "segment.ms": { type: "ms", value: BigInt("1") },
      "compression.type": "producer",
      "file.delete.delay.ms": { type: "ms", value: BigInt("1") },
      "flush.messages": { type: "ms", value: BigInt("1") },
      "flush.ms": { type: "ms", value: BigInt("1") },
      "follower.replication.throttled.replicas": "optional",
      "index.interval.bytes": { type: "bytes", value: BigInt("9") },
      "leader.replication.throttled.replicas": "optional",
      "message.format.version": "abc",
      "min.cleanable.dirty.ratio": 678,
      "min.insync.replicas": 345,
      "segment.index.bytes": { type: "bytes", value: BigInt("9") },
      "segment.jitter.ms": { type: "ms", value: BigInt("1") },
      "unclean.leader.election.enable": false,
      preallocate: false,
    },
    constantValues: constantValues,
    availablePartitionLimit: 10,
  },
} as ComponentMeta<typeof CreateTopicWizard>;

const Template: ComponentStory<typeof CreateTopicWizard> = (args) => (
  <CreateTopicWizard {...args} />
);

export const AdvanceTopic = Template.bind({});
AdvanceTopic.args = {};
AdvanceTopic.parameters = {
  docs: {
    description: {
      story: `A user can create a topic with advance configurations `,
    },
  },
};
