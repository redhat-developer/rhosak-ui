import type { Bytes, Milliseconds, CleanupPolicy } from "../types";

/** Kafka topic configs https://kafka.apache.org/documentation/#topicconfigs */

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

export type UserEditable = {
  "cleanup.policy": CleanupPolicy;
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

export type ReadOnly = {
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

export type TopicConfig = UserEditable & ReadOnly;

export type TopicConfigField = keyof TopicConfig;
