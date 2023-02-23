import { useQueryClient } from "@tanstack/react-query";
import type { FetchDedicatedClusterSizesParams } from "../fetchers";
import { fetchDedicatedClusterSizes } from "../fetchers";
import { dedicatedQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useDedicatedClusterSizesFetchQuery() {
  const queryClient = useQueryClient();
  const { dedicatedClusters } = useApi();
  return async ({
    clusterId,
  }: Omit<FetchDedicatedClusterSizesParams, "getEnterpriseClusterById">) => {
    const api = dedicatedClusters();
    return queryClient.fetchQuery({
      queryKey: dedicatedQueries.clusterSizes({ clusterId }),
      queryFn: async () => {
        return fetchDedicatedClusterSizes({
          clusterId,
          getEnterpriseClusterById: (...args) =>
            api.getEnterpriseClusterById(...args),
        });
      },
    });
  };
}
