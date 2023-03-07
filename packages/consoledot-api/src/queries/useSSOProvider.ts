import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@rhoas/app-services-ui-shared";
import { masQueries } from "../queryKeys";
import type { SsoProviderAllOf } from "@rhoas/kafka-management-sdk";

export const useSSOProviders = () => {
  const config = useConfig();

  return useQuery<SsoProviderAllOf>({
    queryKey: masQueries.ssoProviders(),
    queryFn: async () => {
      const response = await fetch(
        `${config.kas.apiBasePath}/api/kafkas_mgmt/v1/sso_providers`
      );
      return response.json();
    },
  });
};
