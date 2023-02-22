import {
  useDedicatedClustersFetchQuery,
  useDedicatedClusterSizesFetchQuery,
  useDedicatedQuotaFetchQuery,
} from "consoledot-api";
import { useCallback } from "react";
import type { CreateDedicatedKafkaInstanceProps } from "ui";

export function useCreateDedicatedKafkaCallbacks() {
  const dedicatedQuotaQuery = useDedicatedQuotaFetchQuery(true);
  const dedicatedClustersQuery = useDedicatedClustersFetchQuery();
  const dedicatedClusterSizesQuery = useDedicatedClusterSizesFetchQuery();

  const checkDedicatedQuota = useCallback<
    CreateDedicatedKafkaInstanceProps["checkDedicatedQuota"]
  >(
    async ({ onQuotaAvailable, onNoQuotaAvailable, onOutOfQuota }) => {
      try {
        const { remainingDedicatedQuota } = await dedicatedQuotaQuery();

        if (remainingDedicatedQuota !== undefined) {
          if ((remainingDedicatedQuota || 0) === 0) {
            onOutOfQuota({});
          } else {
            onQuotaAvailable({
              quota: {
                remainingDedicatedQuota,
              },
            });
          }
        } else {
          onNoQuotaAvailable({});
        }
      } catch (e) {
        onNoQuotaAvailable({});
      }
    },
    [dedicatedQuotaQuery]
  );

  const fetchClusters = useCallback<
    CreateDedicatedKafkaInstanceProps["fetchClusters"]
  >(
    async (plan, { onAvailable, onUnavailable }) => {
      try {
        const { clusters } = await dedicatedClustersQuery();
        onAvailable({
          clusters,
          defaultCluster: clusters.length > 0 ? clusters[0] : undefined,
        });
      } catch {
        onUnavailable();
      }
    },
    [dedicatedClustersQuery]
  );

  const getDedicatedSizes = useCallback<
    CreateDedicatedKafkaInstanceProps["getDedicatedSizes"]
  >(
    (cluster) => dedicatedClusterSizesQuery({ clusterId: cluster.id }),
    [dedicatedClusterSizesQuery]
  );

  return {
    checkDedicatedQuota,
    fetchClusters,
    getDedicatedSizes,
  };
}
