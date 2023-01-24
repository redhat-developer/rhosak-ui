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
import { useState } from "react";
import { PermissionsToolbar } from "./PermissionsToolbar";

type SubUnion<T, U extends T> = U;
export type PermissionsField = keyof Permissions;
const Columns: SubUnion<
  PermissionsField,
  "" | "account" | "permission" | "resource"
>[] = ["", "account", "permission", "resource"];

export type PermissionsTableProps<T extends Permissions> = {
  permissions: Array<T> | undefined;
  onDelete: (row: T) => void;
  onDeleteSelected: (rowIndex: number[]) => void;
  onManagePermissions: () => void;
  onChange: (page: number, perPage: number) => void;
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
  onDeleteSelected,
  onPageChange,
  onManagePermissions,
  onChange,
}: PermissionsTableProps<T>) => {
  const { t } = useTranslation("manage-kafka-permissions");
  const [checkedRows, setCheckedRows] = useState<number[]>([]);

  const labels: { [field in (typeof Columns)[number]]: string } = {
    "": "",
    account: t("account_id_title"),
    permission: t("table.permissions_column_title"),
    resource: t("table.resource_column_title"),
  };
  return (
    <>
      <PermissionsToolbar
        onManagePermissions={onManagePermissions}
        onDeleteSelected={onDeleteSelected}
        checkedRows={checkedRows}
        itemCount={itemCount || 0}
        page={page}
        perPage={perPage || 10}
        onChange={onChange}
      />
      <TableView
        variant={TableVariant.compact}
        tableOuiaId={"card-table"}
        ariaLabel={t("consumerGroup.consumer_group_list")}
        data={permissions}
        columns={Columns}
        renderHeader={({ column, Th, key }) => (
          <Th key={key}>{labels[column]}</Th>
        )}
        renderCell={({ column, row, Td, key, rowIndex }) => {
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
                  case "":
                    return (
                      <Td
                        select={{
                          rowIndex,
                          isSelected: checkedRows.includes(rowIndex),
                          onSelect: (_event, isSelecting) =>
                            setCheckedRows(
                              isSelecting
                                ? [...checkedRows, rowIndex]
                                : checkedRows.filter((row) => row !== rowIndex)
                            ),
                        }}
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
