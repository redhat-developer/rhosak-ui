import { useQuery } from "@tanstack/react-query";
import { masQueries } from "../queryKeys";
import { useApiConfiguration } from "../ApiProvider";

type SSOProvider = {
  token_url: string;
};

export const useSSOProvider = (): SSOProvider => {
  const { basePath } = useApiConfiguration();

  const { data: SSOProvider } = useQuery<SSOProvider>({
    queryKey: masQueries.tokenEndPointUrl(),
    queryFn: async () => {
      const response = await fetch(
        `${basePath}/api/kafkas_mgmt/v1/sso_providers`
      );

      const providers: SSOProvider = await response.json();
      const token_url = providers.token_url;

      return { token_url };
    },
  });

  const token_url = SSOProvider?.token_url;

  if (!token_url) {
    throw new Error("Token URL is undefined");
  }

  return { token_url };
};
