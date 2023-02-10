import { usePaginationSearchParams } from "@rhoas/app-services-ui-components";
import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import { PermissionsTable } from "ui";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import { useAcls, useDeletePermissionsMutation } from "consoledot-api";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { useHistory } from "react-router-dom";
import type { DataPlanePermissionsNavigationProps } from "../routesConsts";

export const AclsRoute: VoidFunctionComponent<
  DataPlanePermissionsNavigationProps
> = ({ instancesHref, managePermissionsHref }) => {
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const { instance } = useDataPlaneGate();
  const { mutateAsync } = useDeletePermissionsMutation();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const { data } = useAcls({
    id: instance?.id,
    adminUrl: instance?.adminUrl,
    page,
    perPage,
  });

  const onDeleteSelected = useCallback(
    (rowIndex: number[]) => {
      rowIndex.map((value) => {
        const rowToDelete = data?.groups[value];
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
          onError: () => {
            // TODO: alert
          },
          onSuccess: () => {
            // No action
          },
        });
      });
    },
    [data?.groups, mutateAsync, instance.id, instance.adminUrl]
  );

  const onDelete = useCallback(
    (rowIndex: number) => {
      const rowToDelete = data?.groups[rowIndex];
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
        onError: () => {
          // TODO: alert
        },
        onSuccess: () => {
          // No action
        },
      });
    },
    [data?.groups, mutateAsync, instance.id, instance.adminUrl]
  );
  const onManagePermission = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(managePermissionsHref(instance.id));
  }, [history, instance.id, managePermissionsHref]);

  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"permissions"}
      />
      <PermissionsTable
        permissions={data?.groups}
        onDelete={onDelete}
        onDeleteSelected={onDeleteSelected}
        onManagePermissions={onManagePermission}
        onPerPageChange={setPaginationQuery}
        itemCount={data?.count}
        page={page}
        perPage={perPage}
        onPageChange={setPagination}
      />
    </>
  );
};
