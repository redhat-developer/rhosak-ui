import type { AppServicesApi } from "@rhoas/account-management-sdk";
import type {
  MarketPlace,
  MarketPlaceSubscriptions,
} from "@rhoas/app-services-ui-components";
import {
  developerId,
  isMarketplaceQuota,
  isStandardQuota,
  resourceName,
  standardId,
} from "../utilsAndConstants";

export type StandardQuota = {
  hasTrialQuota: boolean;
  remainingPrepaidQuota: number | undefined;
  remainingMarketplaceQuota: number | undefined;
  marketplaceSubscriptions: MarketPlaceSubscriptions[];
};
export const fetchStandardQuota = async (
  api: AppServicesApi["apiAccountsMgmtV1OrganizationsOrgIdQuotaCostGet"],
  organizationId: string
) => {
  const quotaResponse = await api(
    organizationId,
    undefined,
    true,
    undefined,
    true
  );
  if (quotaResponse.status !== 200) {
    throw new Error(quotaResponse.statusText);
  }
  const standardQuotas = quotaResponse.data.items?.filter((q) =>
    q.related_resources?.find(
      (r) => r.resource_name === resourceName && r.product === standardId
    )
  );

  const prepaidQuota = standardQuotas?.find(isStandardQuota);

  const marketplaceQuotas = standardQuotas?.some(isMarketplaceQuota)
    ? standardQuotas?.filter(isMarketplaceQuota)
    : undefined;

  const hasTrialQuota =
    (prepaidQuota === undefined &&
      marketplaceQuotas === undefined &&
      quotaResponse.data.items?.some((q) =>
        q.related_resources?.find(
          (r) => r.resource_name === resourceName && r.product === developerId
        )
      )) ||
    false;

  const remainingPrepaidQuota = prepaidQuota
    ? prepaidQuota.allowed - prepaidQuota.consumed
    : undefined;
  const remainingMarketplaceQuota = marketplaceQuotas
    ? marketplaceQuotas.reduce((agg, q) => q.allowed - q.consumed + agg, 0)
    : undefined;
  const unaggregatedSubscriptions = marketplaceQuotas
    ?.filter((q) => q.cloud_accounts !== undefined)
    .flatMap((q) => q.cloud_accounts!);
  const subscriptionMarketplaces = Array.from(
    new Set(
      unaggregatedSubscriptions?.map((s) => s.cloud_provider_id as MarketPlace)
    )
  );
  const marketplaceSubscriptions: MarketPlaceSubscriptions[] =
    unaggregatedSubscriptions
      ? subscriptionMarketplaces.map((marketplace) => ({
          marketplace,
          subscriptions: unaggregatedSubscriptions
            .filter((s) => s.cloud_provider_id === marketplace)
            .map((s) => s.cloud_account_id!),
        }))
      : [];

  return {
    hasTrialQuota,
    remainingPrepaidQuota,
    remainingMarketplaceQuota,
    marketplaceSubscriptions,
  };
};
