import type {
  SortDirection,
  Topic as ApiTopic,
  TopicsApi,
} from "@rhoas/kafka-instance-sdk";
import type { Plan } from "ui-models/src/models/kafka";
import type { Topic } from "ui-models/src/models/topic";
import type {
  TopicConfig,
  TopicConfigField,
} from "ui-models/src/models/topic-config";
import type { Bytes, Milliseconds } from "../../../ui-models/src/types";
import type { KafkaTopicsSortableColumn } from "../types";

export type FetchTopicsParams = {
  getTopics: TopicsApi["getTopics"];
  page?: number;
  perPage?: number;
  sort?: KafkaTopicsSortableColumn;
  direction?: SortDirection;
  filter?: string;
  plan: Plan;
};

export async function fetchTopics({
  getTopics,
  page,
  perPage,
  filter,
  sort,
  direction,
  plan,
}: FetchTopicsParams): Promise<{ topics: Topic[]; count: number }> {
  const d = plan === "developer" ? developerDefaults : standardDefaults;
  const response = await getTopics(
    undefined,
    undefined,
    perPage,
    filter,
    page,
    direction,
    sort
  );
  const topics = (response.data.items || []).map<Topic>((t: ApiTopic) => {
    const cm = Object.fromEntries<string>(
      t.config?.map((c) => [c.key as TopicConfigField, c.value]) || []
    );
    const config: TopicConfig = {
      "cleanup.policy": cm["cleanup.policy"] as TopicConfig["cleanup.policy"],
      "delete.retention.ms": configValueToMilliseconds(
        cm["delete.retention.ms"],
        d["delete.retention.ms"]
      ),
      "max.compaction.lag.ms": configValueToMilliseconds(
        cm["max.compaction.lag.ms"],
        d["max.compaction.lag.ms"]
      ),
      "max.message.bytes": configValueToBytes(
        cm["max.message.bytes"],
        d["max.message.bytes"]
      ),
      "message.downconversion.enable": configValueToBoolean(
        cm["message.downconversion.enable"],
        d["message.downconversion.enable"]
      ),
      "message.timestamp.difference.max.ms": configValueToMilliseconds(
        cm["message.timestamp.difference.max.ms"],
        d["message.timestamp.difference.max.ms"]
      ),
      "message.timestamp.type": cm[
        "message.timestamp.type"
      ] as TopicConfig["message.timestamp.type"],
      "min.compaction.lag.ms": configValueToMilliseconds(
        cm["min.compaction.lag.ms"],
        d["min.compaction.lag.ms"]
      ),
      "retention.bytes": configValueToBytes(
        cm["retention.bytes"],
        d["retention.bytes"]
      ),
      "retention.ms": configValueToMilliseconds(
        cm["retention.ms"],
        d["retention.ms"]
      ),
      "segment.bytes": configValueToBytes(
        cm["segment.bytes"],
        d["segment.bytes"]
      ),
      "segment.ms": configValueToMilliseconds(
        cm["segment.ms"],
        d["segment.ms"]
      ),
      "compression.type": cm[
        "compression.type"
      ] as TopicConfig["compression.type"],
      "file.delete.delay.ms": configValueToMilliseconds(
        cm["file.delete.delay.ms"],
        d["file.delete.delay.ms"]
      ),
      "flush.messages": configValueToMilliseconds(
        cm["flush.messages"],
        d["flush.messages"]
      ),
      "flush.ms": configValueToMilliseconds(cm["flush.ms"], d["flush.ms"]),
      "follower.replication.throttled.replicas":
        cm["follower.replication.throttled.replicas"],
      "index.interval.bytes": configValueToBytes(
        cm["index.interval.bytes"],
        d["index.interval.bytes"]
      ),
      "leader.replication.throttled.replicas":
        cm["leader.replication.throttled.replicas"],
      "message.format.version": cm["message.format.version"],
      "min.cleanable.dirty.ratio": configValueToNumber(
        cm["min.cleanable.dirty.ratio"],
        d["min.cleanable.dirty.ratio"]
      ),
      "min.insync.replicas": configValueToNumber(
        cm["min.insync.replicas"],
        d["min.insync.replicas"]
      ),
      "segment.index.bytes": configValueToBytes(
        cm["segment.index.bytes"],
        d["segment.index.bytes"]
      ),
      "segment.jitter.ms": configValueToMilliseconds(
        cm["segment.jitter.ms"],
        d["segment.jitter.ms"]
      ),
      "unclean.leader.election.enable": configValueToBoolean(
        cm["unclean.leader.election.enable"],
        d["unclean.leader.election.enable"]
      ),
      preallocate: configValueToBoolean(cm["preallocate"], d["preallocate"]),
    };
    return {
      name: t.name!,
      partitionsCount: t.partitions?.length || 0,
      config,
    };
  });
  const count = response.data.total;
  return { count, topics };
}

function configValueToMilliseconds(
  value: string,
  defaultIfEmpty: Milliseconds
): Milliseconds {
  return value && value.trim().length > 0
    ? { type: "ms", value: BigInt(value.trim()) }
    : defaultIfEmpty;
}

function configValueToBytes(value: string, defaultIfEmpty: Bytes): Bytes {
  return value && value.trim().length > 0
    ? { type: "bytes", value: BigInt(value.trim()) }
    : defaultIfEmpty;
}

function configValueToNumber(value: string, defaultIfError: number): number {
  return parseInt(value, 10) || defaultIfError;
}

function configValueToBoolean(value: string, defaultIfError: boolean): boolean {
  try {
    const v: unknown = JSON.parse(value);
    if (typeof v !== "boolean") {
      throw new Error(`configValueToBoolean: not a boolean [${value}]`);
    }
    return v;
  } catch {
    return defaultIfError;
  }
}

export const developerDefaults: TopicConfig = {
  "cleanup.policy": "delete",
  "delete.retention.ms": { type: "ms", value: BigInt("86400000") },
  "max.compaction.lag.ms": { type: "ms", value: BigInt("9223372036854775807") },
  "max.message.bytes": { type: "bytes", value: BigInt("1048588") },
  "message.downconversion.enable": true,
  "message.timestamp.difference.max.ms": {
    type: "ms",
    value: BigInt("9223372036854775807"),
  },
  "message.timestamp.type": "CreateTime",
  "min.compaction.lag.ms": { type: "ms", value: BigInt("0") },
  "retention.bytes": { type: "bytes", value: BigInt("-1") },
  "retention.ms": { type: "ms", value: BigInt("604800000") },
  "segment.bytes": { type: "bytes", value: BigInt("1073741824") },
  "segment.ms": { type: "ms", value: BigInt("604800000") },
  "compression.type": "producer",
  "file.delete.delay.ms": { type: "ms", value: BigInt("60000") },
  "flush.messages": { type: "ms", value: BigInt("9223372036854775807") },
  "flush.ms": { type: "ms", value: BigInt("9223372036854775807") },
  "index.interval.bytes": { type: "bytes", value: BigInt("4096") },
  "message.format.version": "3.0-IV1",
  "min.cleanable.dirty.ratio": 0.5,
  "min.insync.replicas": 1,
  "segment.index.bytes": { type: "bytes", value: BigInt("10485760") },
  "segment.jitter.ms": { type: "ms", value: BigInt("0") },
  "unclean.leader.election.enable": false,
  preallocate: false,
} as const;

export const standardDefaults: TopicConfig = {
  "cleanup.policy": "delete",
  "delete.retention.ms": { type: "ms", value: BigInt("86400000") },
  "max.compaction.lag.ms": { type: "ms", value: BigInt("9223372036854775807") },
  "max.message.bytes": { type: "bytes", value: BigInt("1048588") },
  "message.downconversion.enable": true,
  "message.timestamp.difference.max.ms": {
    type: "ms",
    value: BigInt("9223372036854775807"),
  },
  "message.timestamp.type": "CreateTime",
  "min.compaction.lag.ms": { type: "ms", value: BigInt("0") },
  "retention.bytes": { type: "bytes", value: BigInt("-1") },
  "retention.ms": { type: "ms", value: BigInt("604800000") },
  "segment.bytes": { type: "bytes", value: BigInt("1073741824") },
  "segment.ms": { type: "ms", value: BigInt("604800000") },
  "compression.type": "producer",
  "file.delete.delay.ms": { type: "ms", value: BigInt("60000") },
  "flush.messages": { type: "ms", value: BigInt("9223372036854775807") },
  "flush.ms": { type: "ms", value: BigInt("9223372036854775807") },
  "index.interval.bytes": { type: "bytes", value: BigInt("4096") },
  "message.format.version": "3.0-IV1",
  "min.cleanable.dirty.ratio": 0.5,
  "min.insync.replicas": 2,
  "segment.index.bytes": { type: "bytes", value: BigInt("10485760") },
  "segment.jitter.ms": { type: "ms", value: BigInt("0") },
  "unclean.leader.election.enable": false,
  preallocate: false,
} as const;
