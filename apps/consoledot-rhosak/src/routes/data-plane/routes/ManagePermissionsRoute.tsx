import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import type { Account } from "ui";
import { PrincipalType } from "ui";
import { useHistory } from "react-router-dom";
import type { DataPlanePermissionsNavigationProps } from "../routesConsts";
import { SelectAccount } from "ui";
import { editPermissionsHref } from "../DataPlaneRoutes";
import { useSelectAccountsGate } from "../useSelectAccountsGate";

export const ManagePermissionsRoute: VoidFunctionComponent<
  DataPlanePermissionsNavigationProps
> = ({ managePermissionsHref }) => {
  const { instance, accounts, serviceAccounts } = useSelectAccountsGate();

  const userAccounts: Account[] = accounts.accounts.map((userAccount) => {
    return {
      displayName: userAccount.displayName,
      id: userAccount.username,
      principalType: PrincipalType.UserAccount,
    };
  });

  const serviceAccountList: Account[] = serviceAccounts.serviceAccounts.map(
    (userAccount) => {
      return {
        displayName: userAccount.displayName,
        id: userAccount.id,
        principalType: PrincipalType.ServiceAccount,
      };
    }
  );

  const allAccounts = [...serviceAccountList, ...userAccounts];
  const filteredAccounts = allAccounts.filter(
    (value) => value.id != instance.owner
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
    [history, instance.id]
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
