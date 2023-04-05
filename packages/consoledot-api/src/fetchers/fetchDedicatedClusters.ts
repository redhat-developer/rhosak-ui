import type { EnterpriseDataplaneClustersApi } from "@rhoas/kafka-management-sdk";
import { AxiosError } from "axios";
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
}: FetchDedicatedClustersParams): Promise<{
  isEntitled: boolean;
  clusters: DedicatedCluster[];
  count: number;
}> {
  try {
    const response = await getEnterpriseOsdClusters();

    const rawClusters = response.data.items || [];
    const meta = await fetchClustersMeta(rawClusters.map((c) => c.id));
    return {
      isEntitled: true,
      clusters: rawClusters.map((c) =>
        dedicatedClusterTransformer(c, meta[c.id])
      ),
      count: response.data.total,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 403) {
        return {
          isEntitled: false,
          clusters: [],
          count: 0,
        };
      }
    }
    throw new Error("Unexpected error fetching dedicated clusters");
  }
}
