import { TableVariant } from "@patternfly/react-table";
import type { TableViewProps } from "@rhoas/app-services-ui-components";
import {
  EmptyStateNoResults,
  TableView,
} from "@rhoas/app-services-ui-components";
import { useTranslation } from "react-i18next";
import type { Permissions } from "../types";
import { ConsumerGroupEmptyState } from "../../ConsumerGroups";
import { PrincipalCell, PermissionOperationCell, ResourceCell } from "./Cells";

type SubUnion<T, U extends T> = U;
export type PermissionsField = keyof Permissions;
const Columns: SubUnion<
  PermissionsField,
  "account" | "permission" | "resource"
>[] = ["account", "permission", "resource"];

export type PermissionsTableProps<T extends Permissions> = {
  permissions: Array<T> | undefined;
  onDelete: (row: T) => void;
  onManagePermissions: () => void;
} & Pick<
  TableViewProps<T, (typeof Columns)[number]>,
  | "itemCount"
  | "page"
  | "perPage"
  | "onPageChange"
  | "isRowSelected"
  | "onClearAllFilters"
>;

export const PermissionsTable = <T extends Permissions>({
  permissions,
  onDelete,
  itemCount,
  page,
  perPage,
  onPageChange,
  onManagePermissions,
}: PermissionsTableProps<T>) => {
  const { t } = useTranslation("manage-kafka-permissions");

  const labels: { [field in (typeof Columns)[number]]: string } = {
    account: t("account_id_title"),
    permission: t("table.permissions_column_title"),
    resource: t("table.resource_column_title"),
  };
  return (
    <>
      {/* TO DO
      <PermissionsToolbar
        onDeleteSelected={onDeleteSelected}
        deleteSelectedEnabled={true}
      />*/}
      <TableView
        variant={TableVariant.compact}
        tableOuiaId={"card-table"}
        ariaLabel={t("consumerGroup.consumer_group_list")}
        data={permissions}
        columns={Columns}
        renderHeader={({ column, Th, key }) => (
          <Th key={key}>{labels[column]}</Th>
        )}
        renderCell={({ column, row, Td, key }) => {
          return (
            <Td key={key} dataLabel={labels[column]}>
              {(() => {
                switch (column) {
                  case "account":
                    return (
                      <PrincipalCell
                        isReviewTable={false}
                        principal={row.account}
                        isDeleteEnabled={false}
                      />
                    );
                  case "permission":
                    return (
                      <PermissionOperationCell
                        permission={row.permission.permission}
                        operation={row.permission.operation}
                      />
                    );
                  case "resource":
                    return (
                      <ResourceCell
                        patternType={row.resource.patternType}
                        resourceType={row.resource.resourceType}
                        resourceName={row.resource.resourceName}
                      />
                    );
                }
              })()}
            </Td>
          );
        }}
        renderActions={({ row, ActionsColumn }) => (
          <ActionsColumn
            items={[
              {
                title: t("manage"),
                onClick: () => onManagePermissions(),
              },
              {
                title: t("common:delete"),
                onClick: () => onDelete(row),
              },
            ]}
          />
        )}
        itemCount={itemCount}
        page={page}
        onPageChange={onPageChange}
        perPage={perPage}
        emptyStateNoData={<ConsumerGroupEmptyState />}
        emptyStateNoResults={<EmptyStateNoResults />}
      />
    </>
  );
};
