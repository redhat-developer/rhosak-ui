import type { AppServicesApi } from "@rhoas/account-management-sdk";
import type { MarketPlaceSubscriptions } from "ui-models/src/models/kafka";
import {
  dedicatedId,
  isStandardQuota,
  resourceName,
} from "../utilsAndConstants";

export type DedicatedQuota = {
  hasTrialQuota: boolean;
  remainingDedicatedQuota: number | undefined;
  remainingMarketplaceQuota: number | undefined;
  marketplaceSubscriptions: MarketPlaceSubscriptions[];
};
export const fetchDedicatedQuota = async (
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
  const dedicatedQuotas = quotaResponse.data.items?.filter((q) =>
    q.related_resources?.find(
      (r) => r.resource_name === resourceName && r.product === dedicatedId
    )
  );

  const dedicatedQuota = dedicatedQuotas?.find(isStandardQuota);
  const hasDedicatedQuota = dedicatedQuota !== undefined;

  const remainingDedicatedQuota = dedicatedQuota
    ? dedicatedQuota.allowed - dedicatedQuota.consumed
    : undefined;

  return {
    hasDedicatedQuota,
    remainingDedicatedQuota,
  };
};
