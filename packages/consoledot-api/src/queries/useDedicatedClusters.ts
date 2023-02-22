import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { fetchDedicatedClusters } from "../fetchers";
import { dedicatedQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useDedicatedClusters(
  { refetch }: { refetch: boolean } = { refetch: true }
) {
  const { refetchInterval } = useApiConfiguration();
  const { dedicatedClusters } = useApi();

  return useQuery({
    queryKey: dedicatedQueries.clusters(),
    queryFn: () => {
      const api = dedicatedClusters();

      return fetchDedicatedClusters({
        getEnterpriseOsdClusters: (...args) =>
          api.getEnterpriseOsdClusters(...args),
      });
    },
    refetchInterval: refetch ? refetchInterval : false,
    refetchOnWindowFocus: !refetch ? false : undefined,
    refetchOnReconnect: !refetch ? false : undefined,
    refetchOnMount: !refetch ? false : undefined,
    retry: false,
  });
}
