import { TopicOrderKey } from "@rhoas/kafka-instance-sdk";
import type { RangeQuery } from "@rhoas/kafka-management-sdk";

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export type SafeRangeQuery = NoUndefinedField<RangeQuery>;

export const KafkaInstancesSortableColumns = [
  "name",
  "owner",
  "createdAt",
  "provider",
  "region",
] as const;

export type KafkaInstancesSortableColumn =
  typeof KafkaInstancesSortableColumns[number];

export const KafkaTopicsSortableColumns = [
  ...Object.values(TopicOrderKey),
] as const;

export type KafkaTopicsSortableColumn =
  typeof KafkaTopicsSortableColumns[number];
