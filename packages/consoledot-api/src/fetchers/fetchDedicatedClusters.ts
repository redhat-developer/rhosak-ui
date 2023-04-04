import type { EnterpriseDataplaneClustersApi } from "@rhoas/kafka-management-sdk";
import type {
  DedicatedCluster,
  DedicatedClusterMeta,
} from "ui-models/src/models/dedicated-cluster";
import { dedicatedClusterTransformer } from "../transformers/dedicatedClusterTransformer";

export type FetchDedicatedClustersParams = {
  getEnterpriseOsdClusters: EnterpriseDataplaneClustersApi["getEnterpriseOsdClusters"];
  fetchClustersMeta: (
    clusterIds: string[]
  ) => Promise<{ [id: string]: DedicatedClusterMeta }>;
};

export async function fetchDedicatedClusters({
  getEnterpriseOsdClusters,
  fetchClustersMeta,
}: FetchDedicatedClustersParams): Promise<
  | false
  | {
      clusters: DedicatedCluster[];
      count: number;
    }
> {
  const response = await getEnterpriseOsdClusters();
  if (response.status === 403) {
    return false;
  }
  const rawClusters = response.data.items || [];
  const meta = await fetchClustersMeta(rawClusters.map((c) => c.id));
  return {
    clusters: rawClusters.map((c) =>
      dedicatedClusterTransformer(c, meta[c.id])
    ),
    count: response.data.total,
  };
}
