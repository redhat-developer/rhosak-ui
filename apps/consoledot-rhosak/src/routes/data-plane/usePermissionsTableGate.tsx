import type { Account } from "@rhoas/app-services-ui-components";
import {
  PrincipalType,
  usePaginationSearchParams,
} from "@rhoas/app-services-ui-components";
import { useAcls, useServiceAccounts, useUserAccounts } from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import { DataPlanePermissionsTableRoutePath } from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function usePermissionsTableGate() {
  const { instance } = useDataPlaneGate();
  const { page, perPage } = usePaginationSearchParams();
  const match = useRouteMatch(DataPlanePermissionsTableRoutePath);
  if (!match) {
    throw Error("usePermissionsTableGate used outside the expected route");
  }
  const { data: acls } = useAcls({
    id: instance.id,
    adminUrl: instance.adminUrl,
    page,
    perPage,
  });

  const { data: accounts } = useUserAccounts({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });

  const { data: serviceAccounts } = useServiceAccounts({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });

  const userAccounts: Account[] | undefined = accounts?.accounts.map(
    (userAccount) => {
      return {
        id: userAccount.username,
        displayName: userAccount.displayName,
        email: userAccount.email,
        principalType: PrincipalType.UserAccount,
      };
    }
  );

  const serviceAccountList: Account[] | undefined =
    serviceAccounts?.serviceAccounts.map((serviceAccount) => {
      return {
        id: serviceAccount.id,
        displayName: serviceAccount.displayName,
        principalType: PrincipalType.ServiceAccount,
      };
    });

  const allAccounts =
    serviceAccountList != undefined && userAccounts != undefined
      ? [...serviceAccountList, ...userAccounts]
      :undefined

  return {
    instance,
    acls: acls,
    allAccounts: allAccounts,
  };
}
