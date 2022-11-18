import type { ConfigurationParameters } from "@rhoas/kafka-management-sdk";
import type { FunctionComponent } from "react";
import { createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

type ApiContextProps = {} & Pick<
  ConfigurationParameters,
  "accessToken" | "basePath"
>;

const ApiContext = createContext<ApiContextProps>(null!);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const ApiProvider: FunctionComponent<ApiContextProps> = ({
  children,
  ...context
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ApiContext.Provider value={context}>{children}</ApiContext.Provider>
    </QueryClientProvider>
  );
};

export function useApi() {
  return useContext(ApiContext);
}
