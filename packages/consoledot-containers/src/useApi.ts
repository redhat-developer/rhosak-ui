import { AppServicesApi } from "@rhoas/account-management-sdk";
import { Configuration, DefaultApi } from "@rhoas/kafka-management-sdk";
import axios from "axios";
// import type { AxiosCacheRequestConfig } from "axios-simple-cache-adapter";
// import { createCacheAdapter } from "axios-simple-cache-adapter";
import { useCallback } from "react";
import { useApi } from "./ApiProvider";

// const adapter = createCacheAdapter({
//   debug: localStorage.getItem("log-axios") !== null,
// });

export const useKms = () => {
  const { accessToken, basePath } = useApi();
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

export const useAms = () => {
  const { accessToken, basePath } = useApi();
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
