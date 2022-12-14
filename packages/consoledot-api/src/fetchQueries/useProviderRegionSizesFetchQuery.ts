import { useQueryClient } from "@tanstack/react-query";
import type { Plan } from "ui";
import type { CloudProviderInfoWithRegionsCapacity } from "../fetchers";
import { fetchProviderRegionSizes } from "../fetchers";
import { providerQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useProviderRegionSizesFetchQuery() {
  const queryClient = useQueryClient();
  const { kafkasFleet } = useApi();

  return (
    provider: CloudProviderInfoWithRegionsCapacity,
    region: string,
    plan: Plan
  ) => {
    const kms = kafkasFleet();
    return queryClient.fetchQuery({
      queryKey: providerQueries.limits[
        plan === "standard" ? "standard" : "developer"
      ]({ provider: provider.id, region }),
      queryFn: () =>
        fetchProviderRegionSizes(
          (...args) => kms.getInstanceTypesByCloudProviderAndRegion(...args),
          provider,
          region,
          plan
        ),
      staleTime: Infinity,
    });
  };
}
