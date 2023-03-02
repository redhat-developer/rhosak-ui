import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@rhoas/app-services-ui-shared";
import { masQueries } from "../queryKeys";

type SsoProvider = {
  tokenEndPointUrl: string;
};

export const useSSOProviders = () => {
  const config = useConfig();

  const { data: ssoProviders } = useQuery<SsoProvider[]>({
    queryKey: masQueries.ssoProviders(),
    queryFn: async () => {
      const response = await fetch(
        `${config.kas.apiBasePath}/api/kafkas_mgmt/v1/sso_providers`
      );
      const providers = await response.json();
      return providers.map(
        (provider: { token_url: string }): SsoProvider => ({
          tokenEndPointUrl: provider.token_url,
        })
      );
    },
  });

  const tokenEndPointUrl = ssoProviders?.[0]?.tokenEndPointUrl;

  return { tokenEndPointUrl };
};
