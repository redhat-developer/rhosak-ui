import type { KafkaRequest } from "@rhoas/kafka-management-sdk";
import { useQueryClient } from "@tanstack/react-query";
import { fetchOrganization } from "./fetchOrganization";
import { fetchProviderRegionSizes } from "./fetchProviderRegionSizes";
import { fetchProvidersWithRegions } from "./fetchProvidersWithRegions";
import { fetchStandardQuota } from "./fetchStandardQuota";
import { kafkaRequestToKafkaInstanceEnhanched } from "./kafkaRequestToKafkaInstanceEnhanched";
import { masQueries, providerQueries } from "./queryKeys";
import { useAms, useKms } from "./useApi";

export function useKafkaInstanceTransformer() {
  const queryClient = useQueryClient();
  const getKms = useKms();
  const getAms = useAms();

  const kms = getKms();
  const ams = getAms();
  return async function kafkaInstanceTransformer(instance: KafkaRequest) {
    const organization = await queryClient.fetchQuery({
      queryKey: masQueries.organization(),
      queryFn: () =>
        fetchOrganization((...args) =>
          ams.apiAccountsMgmtV1CurrentAccountGet(...args)
        ),
      staleTime: Infinity,
    });
    if (!organization) {
      return Promise.reject("Missing organization id");
    }
    const standardQuota = await queryClient.fetchQuery({
      queryKey: masQueries.quota({ organization }),
      queryFn: () =>
        fetchStandardQuota(
          (...args) =>
            ams.apiAccountsMgmtV1OrganizationsOrgIdQuotaCostGet(...args),
          organization
        ),
      staleTime: Infinity,
    });

    const providersInfo = await queryClient.fetchQuery({
      queryKey: providerQueries.list({ plan: instance.billing_model }),
      queryFn: () =>
        fetchProvidersWithRegions(
          (...args) => kms.getCloudProviders(...args),
          (...args) => kms.getCloudProviderRegions(...args),
          instance.billing_model !== "standard" ? "developer" : "standard"
        ),
      staleTime: Infinity,
    });
    const providerInfo = providersInfo.providers.find(
      (p) => p.id === instance.cloud_provider
    );
    if (!providerInfo) {
      return Promise.reject("Invalid cloud provider");
    }
    const standardPlanLimitsQuery = queryClient.fetchQuery({
      queryKey: providerQueries.limits.standard({ provider: providerInfo.id }),
      queryFn: () =>
        fetchProviderRegionSizes(
          (...args) => kms.getInstanceTypesByCloudProviderAndRegion(...args),
          providerInfo,
          instance.region!,
          "standard"
        ),
      staleTime: Infinity,
    });
    const developerPlanLimitsQuery = queryClient.fetchQuery({
      queryKey: providerQueries.limits.developer({ provider: providerInfo.id }),
      queryFn: () =>
        fetchProviderRegionSizes(
          (...args) => kms.getInstanceTypesByCloudProviderAndRegion(...args),
          providerInfo,
          instance.region!,
          "standard"
        ),
      staleTime: Infinity,
    });
    const [standardPlanLimits, developerPlanLimits] = await Promise.all([
      standardPlanLimitsQuery,
      developerPlanLimitsQuery,
    ]);
    return kafkaRequestToKafkaInstanceEnhanched(
      instance,
      standardQuota.marketplaceSubscriptions,
      developerPlanLimits,
      standardPlanLimits
    );
  };
}
