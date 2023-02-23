import { useQueryClient } from "@tanstack/react-query";
import { fetchOrganization, fetchStandardQuota } from "../fetchers";
import { masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useStandardQuotaFetchQuery(skipCache = false) {
  const queryClient = useQueryClient();
  const { account } = useApi();
  const ams = account();

  return async () => {
    const organization = await queryClient.fetchQuery({
      queryKey: masQueries.organization(),
      queryFn: () =>
        fetchOrganization((...args) =>
          ams.apiAccountsMgmtV1CurrentAccountGet(...args)
        ),
      staleTime: Infinity,
    });
    if (!organization) {
      return Promise.reject("Missing organization id");
    }
    return queryClient.fetchQuery({
      queryKey: masQueries.quota.standardAvailable(),
      queryFn: () =>
        fetchStandardQuota(
          (...args) =>
            ams.apiAccountsMgmtV1OrganizationsOrgIdQuotaCostGet(...args),
          organization
        ),
      staleTime: skipCache ? undefined : Infinity,
    });
  };
}
