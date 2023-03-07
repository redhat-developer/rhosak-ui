import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { masQueries } from "../queryKeys";

export type SsoProvider = {
  tokenEndPointUrl: string;
};

export const useSSOProvider = () => {
  const { basePath } = useApiConfiguration();

  const { data: ssoProviders, isLoading } = useQuery<SsoProvider>({
    queryKey: masQueries.tokenEndPointUrl(),
    queryFn: async () => {
      const response = await fetch(
        `${basePath}/api/kafkas_mgmt/v1/sso_providers`
      );
      const providers = await response.json();
      const { token_url } = providers;
      const ssoProvider: SsoProvider = { tokenEndPointUrl: token_url };
      return ssoProvider;
    },
  });
  const tokenEndPointUrl = ssoProviders?.tokenEndPointUrl;
  return { tokenEndPointUrl, isLoading };
};
