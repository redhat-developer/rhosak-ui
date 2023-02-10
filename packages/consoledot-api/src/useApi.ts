import { PrincipalApi } from "@redhat-cloud-services/rbac-client";
import { AppServicesApi } from "@rhoas/account-management-sdk";
import {
  Configuration,
  DefaultApi,
  EnterpriseDataplaneClustersApi,
} from "@rhoas/kafka-management-sdk";
import {
  GroupsApi,
  RecordsApi,
  TopicsApi,
  AclsApi,
} from "@rhoas/kafka-instance-sdk";
import { useCallback } from "react";
import { useApiConfiguration } from "./ApiProvider";

export const useApi = () => {
  const { basePath, accessToken } = useApiConfiguration();

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

  const userAccounts = useCallback(async () => {
    const token = await accessToken();
    return new PrincipalApi({
      accessToken: token,
      basePath: `/api/rbac/v1`,
    });
  }, [accessToken]);

  const serviceAccount = useCallback(async () => {
    const token = await accessToken();
    return new ServiceAccountsApi(
      new Configuration({
        accessToken: token,
        basePath: `/mas-local-fm/sas_ui`,
      })
    );
  }, [accessToken]);

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

  const acls = useCallback(
    (adminUrl: string) =>
      new AclsApi(
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
    dedicatedClusters,
    acls,
    serviceAccount,
  };
};
