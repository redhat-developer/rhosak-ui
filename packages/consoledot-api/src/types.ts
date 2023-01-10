import {
  ConsumerGroupOrderKey,
  TopicOrderKey,
} from "@rhoas/kafka-instance-sdk";
import type { RangeQuery } from "@rhoas/kafka-management-sdk";
import { APIErrorCodes } from "@rhoas/kafka-management-sdk";

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

export const KafkaConsumerGroupSortableColumns = [
  ...Object.values(ConsumerGroupOrderKey),
] as const;

export type KafkaConsumerGroupSortableColumn =
  typeof KafkaConsumerGroupSortableColumns[number];

export const ErrorCodes = {
  /** Forbidden to perform this action*/
  UNAUTHORIZED_USER: APIErrorCodes.ERROR_4,
  /** Kafka cluster name is already used*/
  DUPLICATE_INSTANCE_NAME: APIErrorCodes.ERROR_36,
  /** The maximum number of allowed kafka instances has been reached*/
  INTERNAL_CAPACITY_ERROR: APIErrorCodes.ERROR_24,
  /** Insufficient quota*/
  INSUFFICIENT_QUOTA: APIErrorCodes.ERROR_120,
  /** Forbidden to create more instances than the maximum allowed*/
  TRIAL_USED: APIErrorCodes.ERROR_5,
  /** Failed to check quota*/
  FAILED_TO_CHECK_QUOTA: APIErrorCodes.ERROR_121,
  /** Bad request*/
  OWNER_DOES_NOT_EXIST: APIErrorCodes.ERROR_21,
} as const;
