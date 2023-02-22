import { useQueryClient } from "@tanstack/react-query";
import { fetchDedicatedClusters } from "../fetchers";
import { dedicatedQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useDedicatedClustersFetchQuery() {
  const queryClient = useQueryClient();
  const { dedicatedClusters } = useApi();
  return async () => {
    const api = dedicatedClusters();
    return queryClient.fetchQuery({
      queryKey: dedicatedQueries.clusters(),
      queryFn: async () => {
        return fetchDedicatedClusters({
          getEnterpriseOsdClusters: (...args) =>
            api.getEnterpriseOsdClusters(...args),
        });
      },
    });
  };
}
