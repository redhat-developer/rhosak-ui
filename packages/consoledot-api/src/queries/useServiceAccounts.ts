import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import type { FetchServiceAccountsParams } from "../fetchers";
import { fetchServiceAccounts } from "../fetchers";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useServiceAccounts(
  params: Omit<FetchServiceAccountsParams, "getServiceAccounts">
) {
  const { refetchInterval } = useApiConfiguration();
  const { serviceAccount } = useApi();

  return useQuery({
    queryKey: kafkaQueries.instance.serviceAccounts(params),
    queryFn: async () => {
      const api = serviceAccount();

      return fetchServiceAccounts({
        getServiceAccounts: (...args) => api.getServiceAccounts(...args),
        ...params,
      });
    },
    refetchInterval,
  });
}
