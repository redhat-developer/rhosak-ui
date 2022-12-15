import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import {
  useDeveloperInstanceAvailabilityFetchQuery,
  useProviderRegionSizesFetchQuery,
  useProvidersWithRegionsFetchQuery,
  useStandardQuotaFetchQuery,
} from "consoledot-api";
import { useCallback } from "react";
import type { CreateKafkaInstanceProps, StandardSizes } from "ui";

export function useCreateKafkaCallbacks() {
  const { auth } = useChrome();

  const getUsername = useCallback(async () => {
    const username = (await auth.getUser()).identity.user?.username;
    if (!username) {
      return Promise.reject("Invalid user");
    }
    return username;
  }, [auth]);

  const checkDeveloperAvailabilityQuery =
    useDeveloperInstanceAvailabilityFetchQuery();

  const standardQuotaQuery = useStandardQuotaFetchQuery(true);
  const providersWithRegionsQuery = useProvidersWithRegionsFetchQuery();
  const getProvidersInfo = useProvidersWithRegionsFetchQuery();
  const getProviderRegionsSizes = useProviderRegionSizesFetchQuery();

  const checkDeveloperAvailability = useCallback<
    CreateKafkaInstanceProps["checkDeveloperAvailability"]
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

  const checkStandardQuota = useCallback<
    CreateKafkaInstanceProps["checkStandardQuota"]
  >(
    async ({ onQuotaAvailable, onNoQuotaAvailable, onOutOfQuota }) => {
      try {
        const {
          hasTrialQuota,
          remainingPrepaidQuota,
          remainingMarketplaceQuota,
          marketplaceSubscriptions,
        } = await standardQuotaQuery();

        if (
          remainingMarketplaceQuota !== undefined ||
          remainingPrepaidQuota !== undefined
        ) {
          if (
            (remainingMarketplaceQuota || 0) === 0 &&
            (remainingPrepaidQuota || 0) === 0
          ) {
            onOutOfQuota({
              quota: {
                marketplaceSubscriptions,
              },
            });
          } else {
            onQuotaAvailable({
              quota: {
                remainingPrepaidQuota,
                remainingMarketplaceQuota,
                marketplaceSubscriptions,
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
    [standardQuotaQuery]
  );

  const fetchProvidersWithRegions = useCallback<
    CreateKafkaInstanceProps["fetchProvidersWithRegions"]
  >(
    async (plan, { onAvailable, onUnavailable }) => {
      try {
        const providers = await providersWithRegionsQuery(plan);
        onAvailable(providers);
      } catch {
        onUnavailable();
      }
    },
    [providersWithRegionsQuery]
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

  const getTrialSizes = useCallback<CreateKafkaInstanceProps["getTrialSizes"]>(
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
          { id: "1", displayName: "1" },
          { id: "2", displayName: "2" },
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
    checkStandardQuota,
    fetchProvidersWithRegions,
    getStandardSizes,
    getTrialSizes,
  };
}
