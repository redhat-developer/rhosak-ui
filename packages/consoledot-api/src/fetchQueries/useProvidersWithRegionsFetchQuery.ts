import { useQueryClient } from "@tanstack/react-query";
import type { Plan } from "ui-models/src/models/kafka";
import { fetchProvidersWithRegions } from "../fetchers";
import { providerQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useProvidersWithRegionsFetchQuery() {
  const queryClient = useQueryClient();
  const { kafkasFleet } = useApi();

  return (plan: Plan) => {
    const kms = kafkasFleet();
    return queryClient.fetchQuery({
      queryKey: providerQueries.list({ plan }),
      queryFn: () =>
        fetchProvidersWithRegions(
          (...args) => kms.getCloudProviders(...args),
          (...args) => kms.getCloudProviderRegions(...args),
          plan
        ),
      staleTime: Infinity,
    });
  };
}
