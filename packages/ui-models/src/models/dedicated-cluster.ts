import type { AZ, CloudProvider, CloudRegion } from "./kafka";

export type DedicatedCluster = {
  id: string;
  status: "ready" | "failed" | "provisioning";
  requiresPrivateNetwork: boolean;
  cloudProvider: CloudProvider;
  cloudRegion: CloudRegion;
  az: AZ;
};

export type DedicatedClusterField = keyof DedicatedCluster;
