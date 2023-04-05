import { useDedicatedClusters } from "consoledot-api";
import { useStandardQuota } from "consoledot-api/src/queries/useStandardQuota";

export function useDedicatedGate() {
  const quota = useStandardQuota();
  const dedicated = useDedicatedClusters();

  if (
    dedicated.isSuccess &&
    dedicated.data.isEntitled !== false &&
    quota.data &&
    quota.data.hasStandardQuota === false
  ) {
    return "dedicated-only" as const;
  }

  if (dedicated.isSuccess && dedicated.data.isEntitled === false) {
    return "standard-only" as const;
  }

  if (!quota.isFetched && !dedicated.isFetched) {
    return "loading" as const;
  }

  return "standard-and-dedicated" as const;
}
