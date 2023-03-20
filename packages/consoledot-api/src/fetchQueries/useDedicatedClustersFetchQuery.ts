import { useQueryClient } from "@tanstack/react-query";
import { fetchDedicatedClusters } from "../fetchers";
import { dedicatedQueries } from "../queryKeys";
import { useApi } from "../useApi";
import { useClustersMetaFetchQuery } from "./useClustersMetaFetchQuery";

export function useDedicatedClustersFetchQuery() {
  const queryClient = useQueryClient();
  const { dedicatedClusters } = useApi();
  const fetchClustersMeta = useClustersMetaFetchQuery();
  return async () => {
    const api = dedicatedClusters();
    return queryClient.fetchQuery({
      queryKey: dedicatedQueries.clusters(),
      queryFn: async () => {
        const res = await fetchDedicatedClusters({
          getEnterpriseOsdClusters: (...args) =>
            api.getEnterpriseOsdClusters(...args),
          fetchClustersMeta,
        });
        res.clusters.forEach((c) =>
          queryClient.setQueryData(dedicatedQueries.cluster({ id: c.id }), c)
        );
        return res;
      },
    });
  };
}
