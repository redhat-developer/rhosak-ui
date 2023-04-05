import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import {
  useDedicatedClustersFetchQuery,
  useDedicatedClusterSizesFetchQuery,
  useDedicatedQuotaFetchQuery,
  useDeveloperInstanceAvailabilityFetchQuery,
  useProviderRegionSizesFetchQuery,
  useProvidersWithRegionsFetchQuery,
} from "consoledot-api";
import { useCallback } from "react";
import type { CreateDedicatedKafkaInstanceProps } from "ui";
import type { CreateKafkaInstanceProps, StandardSizes } from "ui";

export function useCreateDedicatedKafkaCallbacks() {
  const { auth } = useChrome();
  const dedicatedQuotaQuery = useDedicatedQuotaFetchQuery(true);
  const dedicatedClustersQuery = useDedicatedClustersFetchQuery();
  const dedicatedClusterSizesQuery = useDedicatedClusterSizesFetchQuery();
  const checkDeveloperAvailabilityQuery =
    useDeveloperInstanceAvailabilityFetchQuery();
  const getProvidersInfo = useProvidersWithRegionsFetchQuery();
  const getProviderRegionsSizes = useProviderRegionSizesFetchQuery();

  const getUsername = useCallback(async () => {
    const username = (await auth.getUser())?.identity.user?.username;
    if (!username) {
      return Promise.reject("Invalid user");
    }
    return username;
  }, [auth]);

  const checkDeveloperAvailability = useCallback<
    CreateDedicatedKafkaInstanceProps["checkDeveloperAvailability"]
  >(
    async ({ onAvailable, onUsed, onUnavailable }) => {
      try {
        const available = await checkDeveloperAvailabilityQuery(getUsername);

        if (available) {
          onAvailable();
        } else {
          onUsed();
        }
      } catch {
        onUnavailable();
      }
    },
    [checkDeveloperAvailabilityQuery, getUsername]
  );

  const checkDedicatedQuota = useCallback<
    CreateDedicatedKafkaInstanceProps["checkDedicatedQuota"]
  >(
    async ({ onQuotaAvailable, onNoQuotaAvailable, onOutOfQuota }) => {
      try {
        const { hasTrialQuota, remainingDedicatedQuota } =
          await dedicatedQuotaQuery();

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
          onNoQuotaAvailable({ hasTrialQuota });
        }
      } catch (e) {
        onNoQuotaAvailable({ hasTrialQuota: false });
      }
    },
    [dedicatedQuotaQuery]
  );

  const fetchClusters = useCallback<
    CreateDedicatedKafkaInstanceProps["fetchClusters"]
  >(
    async ({ onAvailable, onUnavailable }) => {
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

  const getStandardSizes = useCallback<
    CreateKafkaInstanceProps["getStandardSizes"]
  >(
    async (provider, region) => {
      const providersInfo = await getProvidersInfo("standard");
      const providerInfo = providersInfo.providers.find(
        (p) => p.id === provider
      );
      if (!providerInfo) {
        return Promise.reject("Invalid cloud provider");
      }
      return getProviderRegionsSizes(providerInfo, region, "standard");
    },
    [getProviderRegionsSizes, getProvidersInfo]
  );

  const getTrialSizes = useCallback<
    CreateDedicatedKafkaInstanceProps["getTrialSizes"]
  >(
    async (provider, region) => {
      let standardSizes: StandardSizes;

      try {
        standardSizes = await getStandardSizes(provider, region);
        if (standardSizes.length === 0) {
          throw new Error("No standard sizes found");
        }
      } catch {
        // It can happen that the selected provider doesn't support standard instances.
        // In this case we provide a faux sample list of sizes just to make the slider happy.
        standardSizes = [
          { id: "1", displayName: "1", quota: 1 },
          { id: "2", displayName: "2", quota: 2 },
        ] as StandardSizes;
      }
      const providersInfo = await getProvidersInfo("developer");
      const providerInfo = providersInfo.providers.find(
        (p) => p.id === provider
      );
      if (!providerInfo) {
        return Promise.reject("Invalid cloud provider");
      }
      const trialSizes = await getProviderRegionsSizes(
        providerInfo,
        region,
        "developer"
      );
      return {
        standard: standardSizes,
        trial: trialSizes[0],
      };
    },
    [getProviderRegionsSizes, getProvidersInfo, getStandardSizes]
  );

  return {
    checkDeveloperAvailability,
    checkDedicatedQuota,
    fetchClusters,
    getDedicatedSizes,
    getTrialSizes,
  };
}
