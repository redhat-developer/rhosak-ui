import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { fetchDedicatedQuota, fetchOrganization } from "../fetchers";
import { masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useDedicatedQuota() {
  const { refetchInterval } = useApiConfiguration();
  const { account } = useApi();
  const ams = account();

  return useQuery({
    queryKey: masQueries.quota.dedicatedAvailable(),
    queryFn: async () => {
      const organization = await fetchOrganization((...args) =>
        ams.apiAccountsMgmtV1CurrentAccountGet(...args)
      );
      if (!organization) {
        return Promise.reject("Missing organization id");
      }
      return fetchDedicatedQuota(
        (...args) =>
          ams.apiAccountsMgmtV1OrganizationsOrgIdQuotaCostGet(...args),
        organization
      );
    },
    refetchInterval,
  });
}
