import type { EnterpriseCluster } from "@rhoas/kafka-management-sdk";
import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";

export function dedicatedClusterTransformer(
  c: EnterpriseCluster
): DedicatedCluster {
  if (c.cluster_id === undefined || c.status === undefined) {
    throw new Error("Invalid EnterpriseCluster data");
  }
  return {
    id: c.cluster_id,
    status: c.status,
  };
}
