import { AppServicesApi } from "@rhoas/account-management-sdk";
import { Configuration, DefaultApi } from "@rhoas/kafka-management-sdk";
import { useCallback } from "react";
import { useApi } from "./ApiProvider";

export const useKms = () => {
  const { accessToken, basePath } = useApi();
  return useCallback(() => {
    const kmsApi = new DefaultApi(
      new Configuration({
        accessToken,
        basePath,
      })
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
      })
    );

    return amsApi;
  }, [accessToken, basePath]);
};
