import type { TopicConfig } from "./topic-config";
import type { TopicPartition } from "./topic-partition";

export type Topic = {
  name: string;
  partitions: TopicPartition[];
} & TopicConfig;

export type TopicField = keyof Topic;
