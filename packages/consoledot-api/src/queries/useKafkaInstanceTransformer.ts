import type { KafkaRequest } from "@rhoas/kafka-management-sdk";
import {
  useProviderRegionSizesFetchQuery,
  useProvidersWithRegionsFetchQuery,
  useStandardQuotaFetchQuery,
} from "../fetchQueries";
import { kafkaRequestToKafkaInstanceEnhanched } from "../transformers/kafkaRequestToKafkaInstanceEnhanched";

export function useKafkaInstanceTransformer() {
  const getStandardQuotaQuery = useStandardQuotaFetchQuery();
  const getProvidersInfo = useProvidersWithRegionsFetchQuery();
  const getProviderRegionsSizes = useProviderRegionSizesFetchQuery();

  return async function kafkaInstanceTransformer(instance: KafkaRequest) {
    const standardQuota = await getStandardQuotaQuery();

    const providersInfo = await getProvidersInfo(
      instance.billing_model !== "standard" ? "developer" : "standard"
    );
    const providerInfo = providersInfo.providers.find(
      (p) => p.id === instance.cloud_provider
    );
    if (!providerInfo) {
      return Promise.reject("Invalid cloud provider");
    }
    const standardPlanLimitsQuery = getProviderRegionsSizes(
      providerInfo,
      instance.region!,
      "standard"
    );
    const developerPlanLimitsQuery = getProviderRegionsSizes(
      providerInfo,
      instance.region!,
      "developer"
    );
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
