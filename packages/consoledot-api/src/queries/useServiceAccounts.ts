import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchUserAccountsParams } from "../fetchers";
import { fetchServiceAccounts } from "../fetchers";
import { masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useServiceAccounts(
  params: Omit<FetchUserAccountsParams, "getUserAccounts">
) {
  const { refetchInterval } = useApiConfiguration();
  const { serviceAccount } = useApi();

  return useQuery({
    queryKey: masQueries.serviceAccounts(params),
    queryFn: async () => {
      const api = await serviceAccount();

      return fetchServiceAccounts({
        getServiceAccounts: (...args) => api.getServiceAccounts(...args),
        ...params,
      });
    },
    refetchInterval,
  });
}
