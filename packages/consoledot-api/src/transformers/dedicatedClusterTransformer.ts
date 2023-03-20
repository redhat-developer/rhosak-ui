import type { EnterpriseCluster } from "@rhoas/kafka-management-sdk";
import type {
  DedicatedCluster,
  DedicatedClusterMeta,
} from "ui-models/src/models/dedicated-cluster";

export function dedicatedClusterTransformer(
  c: EnterpriseCluster & { [key: string]: any }, // TODO: remove this hack with the latest SDK,
  meta: DedicatedClusterMeta
): DedicatedCluster {
  if (c.cluster_id === undefined || c.status === undefined) {
    throw new Error("Invalid EnterpriseCluster data");
  }
  return {
    ...meta,
    id: c.cluster_id,
    status:
      c.status === "ready"
        ? "ready"
        : c.status === "failed"
        ? "failed"
        : c.status === "provisioning"
        ? "provisioning"
        : c.status,
    requiresPrivateNetwork: c.access_kafkas_via_private_network,
    az: c.multi_az ? "multi" : "single",
  };
}
