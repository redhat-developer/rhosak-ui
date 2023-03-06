import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import type { Topic } from "ui-models/src/models/topic";
import type { TopicPartition } from "ui-models/src/models/topic-partition";
import { CreateTopic } from "./CreateTopic";

export default {
  component: CreateTopic,
  args: {
    kafkaName: "kafka-name",
    kafkaPageLink: "kafka-link",
    kafkaInstanceLink: "kafka-instance-link",
    availablePartitionLimit: 10,
    onSave: (value: Topic) => console.log("topic value", value),
    checkTopicName: (topicName) =>
      !["test", "my-test", "test-topic"].some((m) => m == topicName),
    initialTopicValues: {
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
      "retention.bytes": { type: "bytes", value: BigInt("-1") },
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
  },
  parameters: {
    controls: {
      exclude: /.*/g,
    },
  },
} as ComponentMeta<typeof CreateTopic>;

const Template: ComponentStory<typeof CreateTopic> = (args) => (
  <>
    <CreateTopic {...args} />
  </>
);

export const TopicCreation = Template.bind({});
TopicCreation.args = {};
TopicCreation.parameters = {
  docs: {
    description: {
      story: ` A user can create a topic with the basic or advanced work flow. This story provides validation errors when topic name is invalid. We also get a warning modal in case the user exceeds the available partition limit `,
    },
  },
};

export const InvalidTopicName = Template.bind({});
InvalidTopicName.args = {
  initialTopicValues: {
    name: "$!",
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
};
InvalidTopicName.parameters = {
  docs: {
    description: {
      story: ` A user entered an invalid topic name `,
    },
  },
};

export const InvalidLength = Template.bind({});
InvalidLength.args = {
  initialTopicValues: {
    name: "..",
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
};
InvalidLength.parameters = {
  docs: {
    description: {
      story: ` A user entered an invalid topic name `,
    },
  },
};

export const PartitionLimitReached = Template.bind({});
PartitionLimitReached.args = {
  initialTopicValues: {
    name: "as",
    partitions: Array<TopicPartition>(12).fill({ partition: 1, id: 1 }),
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
};
PartitionLimitReached.play = async ({ canvasElement }) => {
  const container = within(canvasElement);
  await userEvent.click(await container.findByText("Next"));
};

PartitionLimitReached.parameters = {
  docs: {
    description: {
      story: ` A user has reached the partitions limit `,
    },
  },
};
