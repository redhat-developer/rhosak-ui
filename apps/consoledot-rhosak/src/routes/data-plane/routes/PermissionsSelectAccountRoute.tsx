import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import type { Account } from "ui";
import { PrincipalType } from "ui";
import { useHistory } from "react-router-dom";
import type { DataPlanePermissionsNavigationProps } from "../routesConsts";
import { SelectAccount } from "ui";
import { useServiceAccounts, useUserAccounts } from "consoledot-api";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { useUserControlGate } from "../../../useUserControlGate";

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const onNext = useCallback(
    (selectedAccount: string | undefined) => {
      //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
    //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
