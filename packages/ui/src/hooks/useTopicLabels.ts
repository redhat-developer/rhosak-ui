import { useTranslation } from "react-i18next";
import type { TopicField } from "ui-models/src/models/topic";

export function useTopicLabels() {
  const { t } = useTranslation("topic");

  const fields: {
    [field in TopicField]: string;
  } = {
    name: t("fields.name"),
    partitions: t("fields.partitions"),
    "cleanup.policy": t("fields.cleanup_policy"),
    "delete.retention.ms": t("fields.delete_retention_ms"),
    "max.compaction.lag.ms": t("fields.max_compaction_lag_ms"),
    "max.message.bytes": t("fields.max_message_bytes"),
    "message.downconversion.enable": t("fields.message_downconversion_enable"),
    "message.timestamp.difference.max.ms": t(
      "fields.message_timestamp_difference_max_ms"
    ),
    "message.timestamp.type": t("fields.message_timestamp_type"),
    "min.compaction.lag.ms": t("fields.min_compaction_lag_ms"),
    "retention.bytes": t("fields.retention_bytes"),
    "retention.ms": t("fields.retention_ms"),
    "segment.bytes": t("fields.segment_bytes"),
    "segment.ms": t("fields.segment_ms"),
    "compression.type": t("fields.compression_type"),
    "file.delete.delay.ms": t("fields.file_delete_delay_ms"),
    "flush.messages": t("fields.flush_messages"),
    "flush.ms": t("fields.flush_ms"),
    "follower.replication.throttled.replicas": t(
      "fields.follower_replication_throttled_replicas"
    ),
    "index.interval.bytes": t("fields.index_interval_bytes"),
    "leader.replication.throttled.replicas": t(
      "fields.leader_replication_throttled_replicas"
    ),
    "message.format.version": t("fields.message_format_version"),
    "min.cleanable.dirty.ratio": t("fields.min_cleanable_dirty_ratio"),
    "min.insync.replicas": t("fields.min_insync_replicas"),
    "segment.index.bytes": t("fields.segment_index_bytes"),
    "segment.jitter.ms": t("fields.segment_jitter_ms"),
    "unclean.leader.election.enable": t(
      "fields.unclean_leader_election_enable"
    ),
    preallocate: t("fields.preallocate"),
  };
  return {
    fields,
  };
}
