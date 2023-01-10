import { AppServicesApi } from "@rhoas/account-management-sdk";
import { GroupsApi, RecordsApi, TopicsApi } from "@rhoas/kafka-instance-sdk";
import { Configuration, DefaultApi } from "@rhoas/kafka-management-sdk";
import { useCallback } from "react";
import { useApiConfiguration } from "./ApiProvider";
import { PrincipalApi } from "@redhat-cloud-services/rbac-client";

export const useApi = () => {
  const { accessToken, basePath } = useApiConfiguration();
  const kafkasFleet = useCallback(
    () =>
      new DefaultApi(
        new Configuration({
          accessToken,
          basePath,
        })
      ),
    [accessToken, basePath]
  );
  const userAccounts = useCallback(
    () => new PrincipalApi({ accessToken: accessToken as string, basePath }),
    [accessToken, basePath]
  );
  const account = useCallback(
    () =>
      new AppServicesApi(
        new Configuration({
          accessToken,
          basePath,
        })
      ),
    [accessToken, basePath]
  );
  const topics = useCallback(
    (adminUrl: string) =>
      new TopicsApi(
        new Configuration({
          accessToken,
          basePath: adminUrl,
        })
      ),
    [accessToken]
  );
  const consumerGroups = useCallback(
    (adminUrl: string) =>
      new GroupsApi(
        new Configuration({
          accessToken,
          basePath: adminUrl,
        })
      ),
    [accessToken]
  );
  const records = useCallback(
    (adminUrl: string) =>
      new RecordsApi(
        new Configuration({
          accessToken,
          basePath: adminUrl,
        })
      ),
    [accessToken]
  );
  return {
    kafkasFleet,
    account,
    topics,
    consumerGroups,
    records,
    userAccounts,
  };
};
