import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { Topic } from "ui-models/src/models/topic";
import { KafkaTopics } from "./KafkaTopics";

const topics: Topic[] = [
  {
    name: "foo",
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
    "retention.ms": { type: "ms", value: BigInt("86400000") },
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
  {
    name: "bar",
    partitions: [
      { partition: 1, id: 1 },
      { partition: 2, id: 2 },
      { partition: 3, id: 3 },
    ],
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
    "retention.bytes": { type: "bytes", value: BigInt("1099511600000") },
    "retention.ms": { type: "ms", value: BigInt("1500000") },
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
  {
    name: "buzz",
    partitions: [
      { partition: 1, id: 1 },
      { partition: 2, id: 2 },
    ],
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
    "retention.ms": { type: "ms", value: BigInt("1500000") },
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
];

export default {
  component: KafkaTopics,
  args: {
    getUrlFortopic: () => "",
    topics: topics,
    topicName: [],
  },
} as ComponentMeta<typeof KafkaTopics>;

const Template: ComponentStory<typeof KafkaTopics> = (args) => (
  <KafkaTopics {...args} />
);

export const WithTopics = Template.bind({});
WithTopics.args = {};

export const NoTopics = Template.bind({});
NoTopics.args = {
  topics: [],
  topicName: ["boo", "foo"],
};
