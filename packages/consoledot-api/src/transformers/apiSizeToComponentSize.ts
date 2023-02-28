import type { SupportedKafkaSize } from "@rhoas/kafka-management-sdk";
import type { SizeWithLimits } from "../fetchers";

export function apiSizeToComponentSize(
  isDisabled: (id: string) => boolean,
  apiSize: SupportedKafkaSize
): SizeWithLimits {
  const s = apiSize as Required<SupportedKafkaSize>;
  return {
    id: s.id,
    displayName: s.display_name,
    quota: s.quota_consumed,
    ingress: (s.ingress_throughput_per_sec.bytes || 0) / 1048576,
    egress: (s.egress_throughput_per_sec.bytes || 0) / 1048576,
    storage: Math.round((s.max_data_retention_size.bytes || 0) / 1073741824),
    connections: s.total_max_connections,
    connectionRate: s.max_connection_attempts_per_sec,
    maxPartitions: s.max_partitions,
    messageSize: (s.max_message_size.bytes || 0) / 1048576,
    status: s.maturity_status === "stable" ? "stable" : "preview",
    trialDurationHours: s.lifespan_seconds ? s.lifespan_seconds / 60 / 60 : 0,
    isDisabled: isDisabled(s.id),
  };
}
