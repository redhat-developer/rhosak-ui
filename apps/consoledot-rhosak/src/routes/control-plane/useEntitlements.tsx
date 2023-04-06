import { useDedicatedQuota } from "consoledot-api";
import { useStandardQuota } from "consoledot-api/src/queries/useStandardQuota";

export function useEntitlements() {
  const standardQuota = useStandardQuota();
  const dedicatedQuota = useDedicatedQuota();

  if (!standardQuota.isFetched || !dedicatedQuota.isFetched) {
    return "loading" as const;
  }

  if (standardQuota.isSuccess && standardQuota.data.hasStandardQuota === true) {
    return "standard" as const;
  }

  if (!dedicatedQuota.isSuccess) {
    throw new Error("Can't resolve entitlements");
  }

  return dedicatedQuota.data.hasTrialQuota
    ? ("trial" as const)
    : ("dedicated" as const);
}
