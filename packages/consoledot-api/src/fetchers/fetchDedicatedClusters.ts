import type { EnterpriseDataplaneClustersApi } from "@rhoas/kafka-management-sdk";
import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";
import { dedicatedClusterTransformer } from "../transformers/dedicatedClusterTransformer";

export type FetchDedicatedClustersParams = {
  getEnterpriseOsdClusters: EnterpriseDataplaneClustersApi["getEnterpriseOsdClusters"];
};

export async function fetchDedicatedClusters({
  getEnterpriseOsdClusters,
}: FetchDedicatedClustersParams): Promise<{
  clusters: DedicatedCluster[];
  count: number;
}> {
  const response = await getEnterpriseOsdClusters();
  if (response.status === 403) {
    throw new MissingDedicatedEntitlement();
  }
  return {
    clusters: (response.data.items || []).map(dedicatedClusterTransformer),
    count: response.data.total,
  };
}

export class MissingDedicatedEntitlement extends Error {}
