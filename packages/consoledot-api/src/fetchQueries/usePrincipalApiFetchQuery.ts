import { useQueryClient } from "@tanstack/react-query";
//import { useKafkaInstanceTransformer } from "../queries";
//import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function usePrincipalApiFetchQuery() {
  const queryClient = useQueryClient();
  //const dataMapper = useKafkaInstanceTransformer();
  const { userAccounts } = useApi();
  return async () => {
    const api = userAccounts();
    return queryClient.fetchQuery({
      queryFn: async () => {
        const instance = await api.listPrincipals();
        return instance.data;
      },
    });
  };
}
