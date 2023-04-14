import type { EnterpriseCluster } from "@rhoas/kafka-management-sdk";
import type {
  DedicatedCluster,
  DedicatedClusterMeta,
  Status,
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
    status: apiStatusToUIStatus[c.status],
    requiresPrivateNetwork: c.access_kafkas_via_private_network,
    az: c.multi_az ? "multi" : "single",
  };
}

const apiStatusToUIStatus: { [key: string]: Status } = {
  cluster_accepted: "accepted",
  // ClusterProvisioning the underlying ocm cluster is provisioning
  cluster_provisioning: "provisioning",
  // ClusterProvisioned the underlying ocm cluster is provisioned
  cluster_provisioned: "provisioned",
  // ClusterFailed the cluster failed to become ready
  failed: "failed",
  // ClusterReady the cluster is terraformed and ready for kafka instances
  ready: "ready",
  // ClusterDeprovisioning the cluster is empty and can be deprovisioned
  deprovisioning: "deprovisioning",
  // ClusterCleanup the cluster external resources are being removed
  cleanup: "cleanup",
  // ClusterWaitingForKasFleetShardOperator the cluster is waiting for the KAS fleetshard operator to be ready
  waiting_for_kas_fleetshard_operator: "waitingOperator",
};
