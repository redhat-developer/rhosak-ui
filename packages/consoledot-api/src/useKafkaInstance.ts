import type { KafkaRequest } from "@rhoas/kafka-management-sdk";
import { useQuery, useQueryClient } from "react-query";
import { fetchOrganization } from "./fetchOrganization";
import { fetchProviderRegionSizes } from "./fetchProviderRegionSizes";
import { fetchProvidersWithRegions } from "./fetchProvidersWithRegions";
import { fetchStandardQuota } from "./fetchStandardQuota";
import { kafkaRequestToKafkaInstanceEnhanched } from "./kafkaRequestToKafkaInstanceEnhanched";
import { useAms, useKms } from "./useApi";

export function useKafkaInstance(id: string | undefined) {
  const dataMapper = useKafkaInstanceTransformer();
  const getKms = useKms();
  const api = getKms();

  return useQuery({
    enabled: Boolean(id),
    queryKey: [{ scope: "kafka-instances", entity: "details", id }],
    queryFn: async () => {
      if (!id) {
        return Promise.reject("Invalid Kafka instance id");
      }
      const instance = await api.getKafkaById(id);
      return dataMapper(instance.data);
    },
  });
}

export function useKafkaInstanceQuery() {
  const queryClient = useQueryClient();
  const dataMapper = useKafkaInstanceTransformer();
  const getKms = useKms();
  return async (id: string) => {
    const api = getKms();
    return queryClient.fetchQuery({
      queryKey: [{ scope: "kafka-instances", entity: "details", id }],
      queryFn: async () => {
        const instance = await api.getKafkaById(id);
        return dataMapper(instance.data);
      },
    });
  };
}

export function useKafkaInstanceTransformer() {
  const queryClient = useQueryClient();
  const getKms = useKms();
  const getAms = useAms();

  const kms = getKms();
  const ams = getAms();
  return async function kafkaInstanceTransformer(instance: KafkaRequest) {
    const organization = await queryClient.fetchQuery({
      queryKey: [{ scope: "organization" }],
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
      queryKey: [{ scope: "standardQuota", organization }],
      queryFn: () =>
        fetchStandardQuota(
          (...args) =>
            ams.apiAccountsMgmtV1OrganizationsOrgIdQuotaCostGet(...args),
          organization
        ),
      staleTime: Infinity,
    });

    const providersInfo = await queryClient.fetchQuery({
      queryKey: [
        {
          scope: "providers-info",
          entity: "list",
          plan: instance.billing_model,
        },
      ],
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
      queryKey: [
        {
          scope: "providers-info",
          entity: "details",
          provider: providerInfo.id,
          plan: "standard",
        },
      ],
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
      queryKey: [
        {
          scope: "providers-info",
          entity: "details",

          provider: providerInfo.id,
          plan: "developer",
        },
      ],
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
