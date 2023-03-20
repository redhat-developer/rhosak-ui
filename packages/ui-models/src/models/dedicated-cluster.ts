import type { AZ, CloudProvider, CloudRegion } from "./kafka";

export type DedicatedCluster = {
  id: string;
  name: string;
  status: "ready" | "failed" | "provisioning";
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

export type DedicatedClusterField = keyof DedicatedCluster;
