import { useServiceAccounts, useUserAccounts } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { Account } from "ui";
import { PrincipalType, SelectAccount } from "ui";
import { useUserControlGate } from "../../../hooks";
import type { DataPlanePermissionsNavigationProps } from "../routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";

export const PermissionsSelectAccountRoute: VoidFunctionComponent<
  DataPlanePermissionsNavigationProps
> = ({ managePermissionsHref, editPermissionsHref }) => {
  const { instance } = useDataPlaneGate();
  const { data: accounts } = useUserAccounts({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });

  const { data: serviceAccounts } = useServiceAccounts({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });

  const { userData } = useUserControlGate();
  const userAccounts: Account[] | undefined = accounts?.accounts.map(
    (userAccount) => {
      return {
        displayName: userAccount.displayName,
        id: userAccount.username,
        principalType: PrincipalType.UserAccount,
      };
    }
  );

  const serviceAccountList: Account[] | undefined =
    serviceAccounts?.serviceAccounts.map((userAccount) => {
      return {
        displayName: userAccount.displayName,
        id: userAccount.id,
        principalType: PrincipalType.ServiceAccount,
      };
    });

  const allAccounts =
    userAccounts != undefined && serviceAccountList != undefined
      ? [...serviceAccountList, ...userAccounts]
      : undefined;
  const filteredAccounts = allAccounts?.filter(
    (value) => value.id !== instance.owner && value.id !== userData.username
  );

  const history = useHistory();

  const onNext = useCallback(
    (selectedAccount: string | undefined) => {
      history.push(
        editPermissionsHref(
          instance.id,
          selectedAccount === "All accounts"
            ? "all-accounts"
            : selectedAccount || ""
        )
      );
    },
    [history, instance.id, editPermissionsHref]
  );

  const onClose = useCallback(() => {
    history.push(managePermissionsHref(instance.id));
  }, [history, instance.id, managePermissionsHref]);

  return (
    <SelectAccount
      accounts={filteredAccounts}
      kafkaName={instance.name}
      onNext={onNext}
      onClose={onClose}
    />
  );
};
