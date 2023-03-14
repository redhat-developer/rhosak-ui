import type { Topic as ApiTopic } from "@rhoas/kafka-instance-sdk/dist/generated/model/topic";
import type { Plan } from "ui-models/src/models/kafka";
import type { Topic } from "ui-models/src/models/topic";
import type {
  TopicConfig,
  TopicConfigField,
} from "ui-models/src/models/topic-config";
import type { Bytes, Milliseconds } from "ui-models/src/types";
import type { TopicSettings } from "@rhoas/kafka-instance-sdk";
import type { CustomRetentionSizeSelect, CustomSelect, TopicForm } from "ui";
import { convert } from "convert";

export const retentionTimeTransformer = (value: CustomSelect) => {
  if (value.value != null)
    switch (value.unit) {
      case "days": {
        const convertedValue = convert(BigInt(value.value), "days").to("ms");
        return convertedValue;
      }
      case "weeks": {
        const convertedValue = convert(BigInt(value.value), "weeks").to("ms");
        return convertedValue;
      }
      case "seconds": {
        const convertedValue = convert(BigInt(value.value), "seconds").to("ms");
        return convertedValue;
      }
      case "hours": {
        const convertedValue = convert(BigInt(value.value), "hours").to("ms");
        return convertedValue;
      }
      case "minutes": {
        const convertedValue = convert(BigInt(value.value), "minutes").to("ms");
        return convertedValue;
      }
      case "unlimited": {
        return BigInt(value.value);
      }
      case "milliseconds": {
        return BigInt(value.value);
      }
    }
};

export const retentionSizeTransformer = (size: CustomRetentionSizeSelect) => {
  switch (size.unit) {
    case "bytes":
      return BigInt(size.value);
    case "kibibytes":
      return convert(BigInt(size.value), "kibibytes").to("bytes");
    case "mebibytes":
      return convert(BigInt(size.value), "mebibytes").to("bytes");
    case "gibibytes":
      return convert(BigInt(size.value), "gibibytes").to("bytes");
    case "tebibytes":
      return convert(BigInt(size.value), "tebibytes").to("bytes");
    case "unlimited":
      return BigInt(size.value);
  }
};

export type UserEditable = Pick<
  TopicConfig,
  "retention.ms" | "retention.bytes" | "cleanup.policy"
>;

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

export function topicTransformerFactory(plan: Plan) {
  const d = plan === "developer" ? developerDefaults : standardDefaults;

  return function topicTransformer(t: ApiTopic): Topic {
    if (!t.name) {
      throw new Error(`Invalid topic, name is empty: ${JSON.stringify(t)}`);
    }
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
      name: t.name,
      partitions: t.partitions || [],
      ...config,
    };
  };
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
    if (typeof v === "boolean") {
      return v;
    }
  } catch {
    // not a boolean, fallback to the default
  }
  return defaultIfError;
}

export const convertToKeyValuePairs = (inputObj: UserEditable) => {
  const keyValuePairs: Array<{ key: string; value: string }> = [];
  if (inputObj["retention.ms"]) {
    keyValuePairs.push({
      key: "retention.ms",
      value: inputObj["retention.ms"].value.toString(),
    });
  }

  if (inputObj["retention.bytes"]) {
    keyValuePairs.push({
      key: "retention.bytes",
      value: inputObj["retention.bytes"].value.toString(),
    });
  }

  if (inputObj["cleanup.policy"]) {
    keyValuePairs.push({
      key: "cleanup.policy",
      value: inputObj["cleanup.policy"],
    });
  }

  return keyValuePairs;
};

export const convertToTopicSettings = (topic: TopicForm): TopicSettings => {
  const tranformedValueInMilliseconds =
    topic.retentionTime.value == -1
      ? BigInt(-1)
      : retentionTimeTransformer(topic.retentionTime);
  const tranformedValueInBytes =
    topic.retentionSize.value == -1
      ? BigInt(-1)
      : retentionSizeTransformer(topic.retentionSize);

  const config: UserEditable = {
    "retention.ms": {
      value: tranformedValueInMilliseconds || BigInt(-1),
      type: "ms",
    },
    "retention.bytes": {
      value: tranformedValueInBytes || BigInt(-1),
      type: "bytes",
    },
    "cleanup.policy": topic.cleanupPolicy,
  };
  const configEntries = convertToKeyValuePairs(config);
  const topicSettings: TopicSettings = {
    numPartitions: topic.partitions,
    config: configEntries,
  };
  return topicSettings;
};
