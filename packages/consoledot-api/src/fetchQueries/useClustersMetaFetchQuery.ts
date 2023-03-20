import { useQueryClient } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { fetchClustersMeta } from "../fetchers";
import { dedicatedQueries } from "../queryKeys";

export function useClustersMetaFetchQuery() {
  const queryClient = useQueryClient();
  const { basePath, accessToken } = useApiConfiguration();
  return async (clusterIds: string[]) => {
    return queryClient.fetchQuery({
      queryKey: dedicatedQueries.clusterNames(clusterIds),
      queryFn: async () => {
        const token = await accessToken();
        return fetchClustersMeta(
          // the control plane uses the production API endpoint for its dependencies, so if we are targeting stage
          // we need to use production for this call
          basePath.includes("api.stage.openshift.com")
            ? "https://api.openshift.com"
            : basePath,
          token,
          clusterIds
        );
      },
    });
  };
}
