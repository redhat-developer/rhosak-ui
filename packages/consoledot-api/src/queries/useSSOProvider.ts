import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { masQueries } from "../queryKeys";

export type SsoProvider = {
  tokenEndPointUrl: string;
};

export const useSSOProvider = () => {
  const { basePath } = useApiConfiguration();

  const { data: ssoProviders } = useQuery<SsoProvider>({
    queryKey: masQueries.tokenEndPointUrl(),
    queryFn: async () => {
      const response = await fetch(
        `${basePath}/api/kafkas_mgmt/v1/sso_providers`
      );
      const providers = await response.json();
      const { token_url } = providers;
      if (token_url === undefined || token_url === "") {
        return Promise.reject("Invalid SSO token URL");
      }
      return { tokenEndPointUrl: token_url };
    },
  });
  const tokenEndPointUrl = ssoProviders?.tokenEndPointUrl;
  return { tokenEndPointUrl };
};
