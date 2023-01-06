import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { TopicDetailView } from "./TopicDetailView";

export default {
  component: TopicDetailView,
  args: {
    topic: {
      name: "test-topic",
      partitions: 1,
      config: {
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
    },
  },
  parameters: {
    controls: {
      exclude: /.*/g,
    },
  },
} as ComponentMeta<typeof TopicDetailView>;

const Template: ComponentStory<typeof TopicDetailView> = (args) => (
  <TopicDetailView {...args} />
);

export const Properties = Template.bind({});
Properties.args = {};
