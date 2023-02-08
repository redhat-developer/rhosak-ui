import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchPermissionsParams } from "../fetchers";
import { fetchPermissions } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useAcls(
  params: { adminUrl?: string } & Omit<FetchPermissionsParams, "getAcls">
) {
  const { refetchInterval } = useApiConfiguration();
  const { acls } = useApi();

  return useQuery({
    queryKey: kafkaQueries.instance.permissions(params),
    queryFn: () => {
      if (!params.adminUrl) {
        return Promise.reject("Invalid adminUrl");
      }
      const api = acls(params.adminUrl);

      return fetchPermissions({
        getAcls: (...args) => api.getAcls(...args),
      });
    },
    enabled: Boolean(params.adminUrl),
    refetchInterval,
  });
}
