import type { ConfigurationParameters } from "@rhoas/kafka-management-sdk";
import { isReactQueryDevToolsEanbled } from "local-storage-helpers";
import type { FunctionComponent } from "react";
import { createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

type ApiContextProps = Pick<
  ConfigurationParameters,
  "accessToken" | "basePath"
> & {
  refetchInterval: number
};

const ApiContext = createContext<ApiContextProps>(null!);

const queryClient = new QueryClient();

export const ApiProvider: FunctionComponent<ApiContextProps> = ({
  children,
  ...context
}) => {
  const showDevTools = isReactQueryDevToolsEanbled();
  return (
    <QueryClientProvider client={queryClient}>
      {showDevTools ? <ReactQueryDevtools initialIsOpen={false} /> : undefined}
      <ApiContext.Provider value={context}>{children}</ApiContext.Provider>
    </QueryClientProvider>
  );
};

export function useApi() {
  return useContext(ApiContext);
}
