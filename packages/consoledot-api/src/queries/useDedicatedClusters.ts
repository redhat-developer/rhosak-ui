import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { fetchDedicatedClusters } from "../fetchers";
import { useClustersMetaFetchQuery } from "../fetchQueries/useClustersMetaFetchQuery";
import { dedicatedQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useDedicatedClusters(
  { refetch }: { refetch: boolean } = { refetch: true }
) {
  const { refetchInterval } = useApiConfiguration();
  const { dedicatedClusters } = useApi();
  const fetchClustersMeta = useClustersMetaFetchQuery();

  return useQuery({
    queryKey: dedicatedQueries.clusters(),
    queryFn: () => {
      const api = dedicatedClusters();

      return fetchDedicatedClusters({
        getEnterpriseOsdClusters: (...args) =>
          api.getEnterpriseOsdClusters(...args),
        fetchClustersMeta,
      });
    },
    refetchInterval: refetch ? refetchInterval : false,
    refetchOnWindowFocus: !refetch ? false : undefined,
    refetchOnReconnect: !refetch ? false : undefined,
    refetchOnMount: !refetch ? false : undefined,
    retry: false,
  });
}
