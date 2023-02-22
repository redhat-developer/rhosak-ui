import type { QuotaCost } from "@rhoas/account-management-sdk";

export const standardId = "RHOSAK" as const;
export const developerId = "RHOSAKTrial" as const;
export const dedicatedId = "RHOSAKCC" as const;
export const resourceName = "rhosak" as const;

export function isStandardQuota(q: QuotaCost) {
  return q.related_resources?.find((r) => r.billing_model === "standard");
}

export function isMarketplaceQuota(q: QuotaCost) {
  return q.related_resources?.find((r) => r.billing_model === "marketplace");
}
