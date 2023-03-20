import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { fetchDedicatedClusters } from "../fetchers";
import { useClustersMetaFetchQuery } from "../fetchQueries/useClustersMetaFetchQuery";
import { dedicatedQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useDedicatedClusters(
  { refetch }: { refetch: boolean } = { refetch: true }
) {
  const queryClient = useQueryClient();
  const { refetchInterval } = useApiConfiguration();
  const { dedicatedClusters } = useApi();
  const fetchClustersMeta = useClustersMetaFetchQuery();

  return useQuery({
    queryKey: dedicatedQueries.clusters(),
    queryFn: async () => {
      const api = dedicatedClusters();

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
    refetchInterval: refetch ? refetchInterval : false,
    refetchOnWindowFocus: !refetch ? false : undefined,
    refetchOnReconnect: !refetch ? false : undefined,
    refetchOnMount: !refetch ? false : undefined,
    retry: false,
  });
}
