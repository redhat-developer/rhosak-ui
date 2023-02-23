import type { EnterpriseCluster } from "@rhoas/kafka-management-sdk";
import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";

export function dedicatedClusterTransformer(
  c: EnterpriseCluster & { [key: string]: any } // TODO: remove this hack with the latest SDK
): DedicatedCluster {
  if (c.cluster_id === undefined || c.status === undefined) {
    throw new Error("Invalid EnterpriseCluster data");
  }
  return {
    id: c.cluster_id,
    status:
      c.status === "ready"
        ? "ready"
        : c.status === "failed"
        ? "failed"
        : "provisioning",
    requiresPrivateNetwork: c.access_kafkas_via_private_network,
    az: c.multi_az ? "multi" : "single",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    cloudProvider: c.cloud_provider,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    cloudRegion: c.region,
  };
}
