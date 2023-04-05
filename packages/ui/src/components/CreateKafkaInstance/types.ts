import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";
import type {
  CloudProvider,
  CloudRegion,
  MarketplaceSubscription,
  MarketPlaceSubscriptions,
  Plan,
  Quota,
  Size,
} from "ui-models/src/models/kafka";

export type CreateKafkaInstanceError =
  | "insufficient-quota"
  | "name-taken"
  | "developer-unavailable"
  | "region-unavailable"
  | "unknown";

export type CreateDedicatedKafkaInstanceError =
  | "insufficient-quota"
  | "name-taken"
  | "cluster-unavailable"
  | "developer-unavailable"
  | "unknown";

export type StandardPlanAvailability =
  | "available"
  | "out-of-quota"
  | "instance-unavailable"
  | "regions-unavailable";

export type DedicatedPlanAvailability =
  | "available"
  | "out-of-quota"
  | "clusters-unavailable";

export type TrialPlanAvailability = "available" | "used" | "unavailable";

export type RegionInfo = {
  id: CloudRegion;
  displayName: string;
  isDisabled: boolean;
};

export type CloudProviderInfo = {
  id: CloudProvider;
  displayName: string;
  regions: Array<RegionInfo>;
  defaultRegion?: CloudRegion;
};
export type CloudProvidersInfo = Array<CloudProviderInfo>;

export type DedicatedClustersInfo = Array<DedicatedCluster>;

export type StandardPlanInitializationData = {
  defaultProvider: CloudProvider | undefined;
  availableProviders: CloudProvidersInfo;
  instanceAvailability: StandardPlanAvailability;
  remainingPrepaidQuota: Quota | undefined;
  remainingMarketplaceQuota: Quota | undefined;
  marketplaceSubscriptions: MarketPlaceSubscriptions[];
  plan: "standard";
};

export type TrialPlanInitializationData = {
  defaultProvider: CloudProvider | undefined;
  availableProviders: CloudProvidersInfo;
  instanceAvailability: TrialPlanAvailability;
  plan: "developer";
};

export type DedicatedPlanInitializationData = {
  defaultCluster: DedicatedCluster | undefined;
  availableClusters: DedicatedClustersInfo;
  instanceAvailability: DedicatedPlanAvailability;
  remainingDedicatedQuota: Quota | undefined;
  plan: "dedicated";
};

export type CreateKafkaInitializationData =
  | StandardPlanInitializationData
  | TrialPlanInitializationData;

export type StandardSizes = Size[];
export type TrialSizes = {
  standard: Size[];
  trial: Size & {
    trialDurationHours: number;
  };
};
export type DedicatedSizes = Size[];

export type CreateKafkaFormData = {
  plan: Plan;
  name: string;
  provider: CloudProvider;
  region: CloudRegion;
  sizeId: string;
  billing: MarketplaceSubscription | "prepaid" | undefined;
};

export type CreateDedicatedKafkaFormData = {
  plan: "dedicated";
  name: string;
  cluster: DedicatedCluster;
  sizeId: string;
  billing: "dedicated";
};
