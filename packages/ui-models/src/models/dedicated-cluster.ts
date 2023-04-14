import type { AZ, CloudProvider, CloudRegion } from "./kafka";

export type DedicatedCluster = {
  id: string;
  name: string;
  status: Status;
  requiresPrivateNetwork: boolean;
  cloudProvider: {
    id: CloudProvider;
    displayName: string;
  };
  cloudRegion: {
    id: CloudRegion;
    displayName: string;
  };
  az: AZ;
};

export type DedicatedClusterMeta = Omit<
  DedicatedCluster,
  "id" | "status" | "requiresPrivateNetwork" | "az"
>;

export const Statuses = [
  "accepted",
  "provisioning",
  "provisioned",
  "failed",
  "ready",
  "deprovisioning",
  "cleanup",
  "waitingOperator",
] as const;

export type Status = (typeof Statuses)[number];

export type DedicatedClusterField = keyof DedicatedCluster;
