import { AppServicesApi } from "@rhoas/account-management-sdk";
import {
  Configuration,
  ConfigurationParameters,
  DefaultApi,
} from "@rhoas/kafka-management-sdk";
import axios from "axios";
// import type { AxiosCacheRequestConfig } from "axios-simple-cache-adapter";
// import { createCacheAdapter } from "axios-simple-cache-adapter";
import { useCallback } from "react";

// const adapter = createCacheAdapter({
//   debug: localStorage.getItem("log-axios") !== null,
// });

export type UseApiParams = Pick<
  ConfigurationParameters,
  "accessToken" | "basePath"
>;

export const useKms = ({ accessToken, basePath }: UseApiParams) => {
  return useCallback(() => {
    const kmsApi = new DefaultApi(
      new Configuration({
        accessToken,
        basePath,
      }),
      undefined,
      axios.create(/*{
        adapter,
        cache: 1000 * 15,
      } as AxiosCacheRequestConfig*/)
    );

    return kmsApi;
  }, [accessToken, basePath]);
};

export const useAms = ({ accessToken, basePath }: UseApiParams) => {
  return useCallback(() => {
    const amsApi = new AppServicesApi(
      new Configuration({
        accessToken,
        basePath,
      }),
      undefined,
      axios.create(/*{
        adapter,
        cache: 1000 * 15,
      } as AxiosCacheRequestConfig*/)
    );

    return amsApi;
  }, [accessToken, basePath]);
};
