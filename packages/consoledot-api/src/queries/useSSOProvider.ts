import { useQuery } from "@tanstack/react-query";
import { useApiConfiguration } from "../ApiProvider";
import { masQueries } from "../queryKeys";

export const useSSOProvider = () => {
  const { basePath } = useApiConfiguration();

  return useQuery({
    queryKey: masQueries.tokenEndPointUrl(),
    queryFn: async () => {
      const response = await fetch(
        `${basePath}/api/kafkas_mgmt/v1/sso_providers`
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const providers: { token_url?: string } = await response.json();
      const { token_url } = providers;
      if (token_url === undefined || token_url === "") {
        return Promise.reject("Invalid SSO token URL");
      }
      return token_url;
    },
  });
};
