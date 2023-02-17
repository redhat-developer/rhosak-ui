import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchUserAccountsParams } from "../fetchers";
import { fetchUserAccounts } from "../fetchers";
import { masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useUserAccounts(
  params: Omit<FetchUserAccountsParams, "getUserAccounts">,
  suspense = false
) {
  const { refetchInterval } = useApiConfiguration();
  const { userAccounts } = useApi();

  return useQuery({
    queryKey: masQueries.userAccounts(params),
    queryFn: async () => {
      const api = await userAccounts();

      return fetchUserAccounts({
        getUserAccounts: (...args) => api.listPrincipals(...args),
        ...params,
      });
    },
    refetchInterval,
    suspense,
  });
}
