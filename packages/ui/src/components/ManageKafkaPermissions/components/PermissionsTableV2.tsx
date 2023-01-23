import type { VFC } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { IAction } from "@patternfly/react-table";
import {
  ActionsColumn,
  TableComposable,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";

import type { AclBinding } from "../types";
import { PermissionOperationCell, PrincipalCell, ResourceCell } from "./Cells";
import { PermissionsToolbar } from "./PermissionsToolbar";

export type PermissionsTableProps = {
  acls: AclBinding[];
  onDeleteSelected: (rowIndex: number[]) => void;
  onManagePermissions: () => void;
  onDelete: (deletedRow: AclBinding) => void;
};

export const PermissionsTableV2: VFC<PermissionsTableProps> = ({
  acls = [],
  onDeleteSelected,
  onDelete,
  onManagePermissions,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  //Save index of checked rows to delete
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const defaultActions = (rowData: AclBinding): IAction[] => [
    {
      title: t("manage"),
      onClick: () => onManagePermissions(),
    },
    {
      title: t("common:delete"),
      onClick: () => onDelete(rowData),
    },
  ];

  return (
    <>
      <PermissionsToolbar
        onDeleteSelected={onDeleteSelected}
        checkedRows={checkedRows}
      />
      <TableComposable
        variant={TableVariant.compact}
        aria-label={t("review_permissions_table")}
      >
        <Thead noWrap>
          <Tr>
            <Th></Th>
            <Th>{t("account_id_title")}</Th>
            <Th>{t("table.permissions_column_title")}</Th>
            <Th>{t("table.resource_column_title")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {acls.map((acl, idx) => {
            const {
              patternType,
              resourceType,
              resourceName,
              operation,
              permission,
              principal,
            } = acl;
            const rowActions = defaultActions(acl);
            return (
              <Tr key={idx}>
                <Td
                  select={{
                    rowIndex: idx,
                    isSelected: checkedRows.includes(idx),
                    onSelect: (_event, isSelecting) =>
                      setCheckedRows(
                        isSelecting
                          ? [...checkedRows, idx]
                          : checkedRows.filter((row) => row !== idx)
                      ),
                  }}
                />

                <Td noPadding>
                  <PrincipalCell
                    isReviewTable={false}
                    principal={principal}
                    isDeleteEnabled={false}
                  />
                </Td>
                <Td>
                  <PermissionOperationCell
                    permission={permission}
                    operation={operation}
                  />
                </Td>
                <Td>
                  <ResourceCell
                    patternType={patternType}
                    resourceType={resourceType}
                    resourceName={resourceName}
                  />
                </Td>
                <Td isActionCell>
                  <ActionsColumn items={rowActions} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </TableComposable>
    </>
  );
};
