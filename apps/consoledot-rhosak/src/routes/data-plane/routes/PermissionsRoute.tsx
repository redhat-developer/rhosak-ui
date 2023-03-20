import { addNotification } from "@redhat-cloud-services/frontend-components-notifications";
import { usePaginationSearchParams } from "@rhoas/app-services-ui-components";
import {
  useAcls,
  useDeletePermissionsMutation,
  useServiceAccounts,
  useUserAccounts,
} from "consoledot-api/src";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import type { Account } from "ui";
import { PermissionsTable, PrincipalType } from "ui";
import type { DataPlanePermissionsNavigationProps } from "../routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const PermissionsRoute: VoidFunctionComponent<
  DataPlanePermissionsNavigationProps
> = ({ instancesHref, managePermissionsHref, editPermissionsHref }) => {
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const { instance } = useDataPlaneGate();
  const { mutateAsync } = useDeletePermissionsMutation();
  const dispatch = useDispatch();

  const history = useHistory();

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
      : undefined;

  const onDeleteSelected = useCallback(
    (rowIndex: number[]) => {
      rowIndex.map((value) => {
        const rowToDelete = acls?.groups[value];
        void mutateAsync({
          instanceId: instance.id,
          adminUrl: instance.adminUrl || "",
          acl: {
            patternType: rowToDelete?.resource.patternType,
            permissionType: rowToDelete?.permission.permission,
            principal: rowToDelete?.account,
            resourceName: rowToDelete?.resource.resourceName,
            operation: rowToDelete?.permission.operation,
            resourceType: rowToDelete?.resource.resourceType,
          },
          onError: (_, message) => {
            dispatch(
              addNotification({
                variant: "danger",
                title: message,
                dismissable: true,
                id: "delete-error",
              })
            );
          },
          onSuccess: () => {
            //We have no action yet to confirm if delete was successfull.
          },
        });
      });
    },
    [acls?.groups, mutateAsync, instance.id, instance.adminUrl, dispatch]
  );

  const onDelete = useCallback(
    (rowIndex: number) => {
      const rowToDelete = acls?.groups[rowIndex];
      void mutateAsync({
        instanceId: instance.id,
        adminUrl: instance.adminUrl || "",
        acl: {
          patternType: rowToDelete?.resource.patternType,
          permissionType: rowToDelete?.permission.permission,
          principal: rowToDelete?.account,
          resourceName: rowToDelete?.resource.resourceName,
          operation: rowToDelete?.permission.operation,
          resourceType: rowToDelete?.resource.resourceType,
        },
        onError: (_, message) => {
          dispatch(
            addNotification({
              variant: "danger",
              title: message,
              dismissable: true,
              id: "delete-error",
            })
          );
        },
        onSuccess: () => {
          // No action
        },
      });
    },
    [acls?.groups, mutateAsync, instance.id, instance.adminUrl, dispatch]
  );

  const onManagePermissionsActionItem = useCallback(
    (account: string) => {
      history.push(editPermissionsHref(instance.id, account));
    },
    [history, instance.id, editPermissionsHref]
  );
  const onManagePermission = useCallback(() => {
    history.push(managePermissionsHref(instance.id));
  }, [history, instance.id, managePermissionsHref]);

  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"permissions"}
      />

      <PermissionsTable
        allAccounts={allAccounts}
        permissions={acls?.groups}
        onDelete={onDelete}
        onDeleteSelected={onDeleteSelected}
        onManagePermissions={onManagePermission}
        onPerPageChange={setPaginationQuery}
        itemCount={acls?.count}
        page={page}
        perPage={perPage}
        onPageChange={setPagination}
        onManagePermissionsActionItem={onManagePermissionsActionItem}
      />
    </>
  );
};
