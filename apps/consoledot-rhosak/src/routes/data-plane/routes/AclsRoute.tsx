import { usePaginationSearchParams } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { PermissionsTable } from "ui";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import { useAcls } from "consoledot-api";

export const AclsRoute: VoidFunctionComponent<ControlPlaneNavigationProps> = ({
  instancesHref,
}) => {
  const { page, perPage, setPagination } = usePaginationSearchParams();

  const { data } = useAcls({ page, perPage });

  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"permissions"}
      />
      <PermissionsTable
        permissions={data?.groups}
        onDelete={function (row: any): void {
          throw new Error("Function not implemented.");
        }}
        onDeleteSelected={function (rowIndex: number[]): void {
          throw new Error("Function not implemented.");
        }}
        onManagePermissions={function (): void {
          throw new Error("Function not implemented.");
        }}
        onChange={function (page: number, perPage: number): void {
          throw new Error("Function not implemented.");
        }}
        itemCount={undefined}
        page={page}
        perPage={perPage}
        onPageChange={setPagination}
      />
    </>
  );
};
