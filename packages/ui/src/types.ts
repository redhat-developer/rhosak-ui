/**
 * A date in the ISO format YYYY-MM-DDTHH:mm:ss.sssZ
 */
export type DateIsoString = string;

/**
 * Supported Cloud Providers. Extend this to add a new provider, then follow
 * Typescript errors to find where extra information need to be added (images,
 * translations).
 */
export type CloudProvider = "aws" | "gcp" | "azure";

/**
 * A Cloud Region. Since this varies between Cloud Providers and has no extra
 * visual attached, we take its name from the API and do no further
 * transformation.
 */
export type CloudRegion = string;
/**
 * Cloud provider multi availability zone
 */
export type AZ = "single" | "multi";
/**
 * A number that describes how much does an instance cost to create
 */
export type Quota = number;
/**
 * The capabilities of an instance, and its quota cost. Some sizes might not be
 * enabled, eg. because temporarily out of capacity
 */
export type Size = {
  id: string;
  displayName: string;
  status: "stable" | "preview";
  quota: Quota;
  ingress: number;
  egress: number;
  storage: number;
  connections: number;
  connectionRate: number;
  maxPartitions: number;
  messageSize: number;
  isDisabled: boolean;
};
/**
 * Paid for instances are `standard`, evaluation instances are `developer`.
 * `standard` instances have a `Quota` associated, and bigger sizes.
 * `developer` instances are free to be created (up to 1 per user), have a
 * single, smaller size option than `standard` ones, and they expire after a
 * few hours.
 *
 * Note: a new kind of evaluation instance is being studied. They will have a
 * long expiration period and bigger sizes.
 */
export type Plan = "standard" | "developer";
/**
 * All the statuses an instance can be. If new statuses are added, ensure to
 * add them to the relevant status group (`ReadyStatuses` etc.).
 */
export const Statuses = [
  "ready",
  "degraded",
  "accepted",
  "provisioning",
  "preparing",
  "deprovision",
  "deleting",
  "suspended",
  "suspending",
  "resuming",
] as const;

export type Status = typeof Statuses[number];

export const CreatingStatuses: readonly Status[] = [
  "accepted",
  "provisioning",
  "preparing",
];
export const ReadyStatuses: readonly Status[] = ["ready"];
export const DegradedStatuses: readonly Status[] = ["degraded"];
export const SuspendingStatuses: readonly Status[] = ["suspending"];
export const SuspendedStatuses: readonly Status[] = ["suspended"];
export const DeletingStatuses: readonly Status[] = ["deleting", "deprovision"];
export const ResumingStatuses: readonly Status[] = ["resuming"];

export const SimplifiedStatuses = {
  creating: CreatingStatuses,
  ready: ReadyStatuses,
  degraded: DegradedStatuses,
  suspended: SuspendedStatuses,
  deleting: DeletingStatuses,
  resuming: ResumingStatuses,
  suspending: SuspendingStatuses,
} as const;
export type SimplifiedStatus = keyof typeof SimplifiedStatuses;

/**
 * A list of marketplaces where an instance can be billed to
 */
export type MarketPlace = CloudProvider | "rhm";
/**
 * List of marketplaces where a user has some subscription
 */
export type MarketPlaceSubscriptions = {
  marketplace: MarketPlace;
  subscriptions: string[];
};
/**
 * A specific marketplace's subscription, assigned as billing option to an
 * instance.
 *
 * Note: the API will provide only the `subscription`; the `MarketPlace` will
 * have to be fetched querying for the `subscription`.
 */
export type MarketplaceSubscription = {
  marketplace: MarketPlace;
  subscription: string;
};

/**
 * All the details abut a Kafka instance.
 *
 * Unless differently specified, the values marked as accepting `undefined`
 * will come from extra API calls.
 */
export type KafkaInstance = {
  id: string;
  name: string;
  createdAt: DateIsoString;
  updatedAt: DateIsoString;
  expiryDate: DateIsoString | undefined;
  owner: string;
  provider: CloudProvider;
  region: CloudRegion;
  status: Status;
  plan: Plan;
  size: string | undefined;
  ingress: number | undefined;
  egress: number | undefined;
  storage: number | undefined;
  maxPartitions: number | undefined;
  connections: number | undefined;
  connectionRate: number | undefined;
  messageSize: number | undefined;
  billing: "prepaid" | MarketplaceSubscription | undefined;

  version: string;

  bootstrapUrl: string | undefined;
  adminUrl: string | undefined;
};
export type KafkaInstanceField = keyof KafkaInstance;

export enum RetentionTimeUnits {
  MILLISECOND = "milliseconds",
  SECOND = "seconds",
  MINUTE = "minutes",
  HOUR = "hours",
  DAY = "days",
  WEEK = "weeks",
  CUSTOM = "custom",
  UNLIMITED = "unlimited",
}

export enum RetentionSizeUnits {
  BYTE = "bytes",
  KIBIBYTE = "kibibytes",
  MEBIBYTE = "mebibytes",
  GIBIBYTE = "gibibytes",
  TEBIBYTE = "tebibytes",
  CUSTOM = "custom",
  UNLIMITED = "unlimited",
}

export type Message = {
  partition?: number;
  offset?: number;
  timestamp?: DateIsoString;
  key?: string;
  value?: string;
  headers: Record<string, string>;
};

export type KafkaTopic = {
  name: string;
  partitionsCount: number;
  config: KafkaTopicConfig;
};

export type KafkaTopicField =
  | keyof Omit<KafkaTopic, "config">
  | `config:${KafkaTopicConfigField}`;

/** Kafka configs https://kafka.apache.org/documentation/#topicconfigs */

/** MAS config
 * https://github.com/bf2fc6cc711aee1a0c2a/kas-fleetshard/blob/a16e64703c8137637fd1a481d14c11514e96a1c9/operator/src/main/resources/application.properties#L160-L161
 *
 * ranges (value:min:max - no value means unbounded)
 * max.message.bytes::1048588
 * segment.bytes:52428800:
 * segment.ms:600000:
 *
 * cleanup.policy
 * delete.retention.ms
 * max.compaction.lag.ms
 * message.downconversion.enable
 * message.timestamp.difference.max.ms
 * message.timestamp.type
 * min.compaction.lag.ms
 * retention.bytes
 * retention.ms
 */

/** MAS enforced for standard instances
 * https://github.com/bf2fc6cc711aee1a0c2a/kas-fleetshard/blob/a16e64703c8137637fd1a481d14c11514e96a1c9/operator/src/main/resources/instances/standard.properties#L40
 *
 * compression.type:producer
 * file.delete.delay.ms:60000
 * flush.messages:9223372036854775807
 * flush.ms:9223372036854775807
 * index.interval.bytes:4096
 * min.cleanable.dirty.ratio:0.5
 * min.insync.replicas:2
 * preallocate:false
 * segment.index.bytes:10485760
 * unclean.leader.election.enable:false
 */

/** MAS enforced for developer instances
 * https://github.com/bf2fc6cc711aee1a0c2a/kas-fleetshard/blob/ec67168c41e3dc23e488577f9e5191433a8dca6c/operator/src/main/resources/instances/developer.properties#L29
 *
 * compression.type:producer
 * file.delete.delay.ms:60000
 * flush.messages:9223372036854775807
 * flush.ms:9223372036854775807
 * index.interval.bytes:4096
 * min.cleanable.dirty.ratio:0.5
 * min.insync.replicas:1
 * preallocate:false
 * segment.index.bytes:10485760
 * unclean.leader.election.enable:false
 */
export type Bytes = { type: "bytes"; value: bigint };
export type Milliseconds = { type: "ms"; value: bigint };

export type KafkaTopicConfigUserEditable = {
  "cleanup.policy": "delete" | "compact" | "delete,compact";
  "delete.retention.ms": Milliseconds;
  "max.compaction.lag.ms": Milliseconds;
  "max.message.bytes": Bytes;
  "message.downconversion.enable": boolean;
  "message.timestamp.difference.max.ms": Milliseconds;
  "message.timestamp.type": "CreateTime" | "LogAppendTime";
  "min.compaction.lag.ms": Milliseconds;
  "retention.bytes": Bytes;
  "retention.ms": Milliseconds;
  "segment.bytes": Bytes;
  "segment.ms": Milliseconds;
};

export type KafkaTopicConfigReadOnly = {
  readonly "compression.type": "producer";
  readonly "file.delete.delay.ms": Milliseconds;
  readonly "flush.messages": Milliseconds;
  readonly "flush.ms": Milliseconds;
  readonly "follower.replication.throttled.replicas"?: string;
  readonly "index.interval.bytes": Bytes;
  readonly "leader.replication.throttled.replicas"?: string;
  readonly "message.format.version": string;
  readonly "min.cleanable.dirty.ratio": number;
  readonly "min.insync.replicas": number;
  readonly "segment.index.bytes": Bytes;
  readonly "segment.jitter.ms": Milliseconds;
  readonly "unclean.leader.election.enable": boolean;
  readonly preallocate: boolean;
};

export type KafkaTopicConfig = KafkaTopicConfigUserEditable &
  KafkaTopicConfigReadOnly;

export type KafkaTopicConfigField = keyof KafkaTopicConfig;

export interface Consumer {
  groupId: string;
  topic: string;
  partition: number;
  offset: number;
  logEndOffset?: number;
  lag: number;
  memberId?: string;
}

export type ConsumerGroupState =
  | "Stable"
  | "Dead"
  | "Empty"
  | "CompletingRebalance"
  | "PreparingRebalance"
  | "Unknown";

export type ConsumerGroup = {
  consumerGroupId: string;
  activeMembers: number;
  partitionsWithLag: number;
  state: ConsumerGroupState;
};

export type ConsumerGroupField = keyof ConsumerGroup;
