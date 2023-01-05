import type { TopicConfig, TopicConfigField } from "./topic-config";

export type Topic = {
  name: string;
  partitionsCount: number;
  config: TopicConfig;
};

export type TopicField =
  | keyof Omit<Topic, "config">
  | `config:${TopicConfigField}`;
