import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { fetchOrganization, fetchStandardQuota } from "../fetchers";
import { masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useStandardQuota() {
  const { refetchInterval } = useApiConfiguration();
  const { account } = useApi();
  const ams = account();

  return useQuery({
    queryKey: masQueries.quota.available(),
    queryFn: async () => {
      const organization = await fetchOrganization((...args) =>
        ams.apiAccountsMgmtV1CurrentAccountGet(...args)
      );
      if (!organization) {
        return Promise.reject("Missing organization id");
      }
      return fetchStandardQuota(
        (...args) =>
          ams.apiAccountsMgmtV1OrganizationsOrgIdQuotaCostGet(...args),
        organization
      );
    },
    refetchInterval,
  });
}
