import type { VFC } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { KebabToggleProps } from "@patternfly/react-core";
import {
  Button,
  Dropdown,
  DropdownItem,
  KebabToggle,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import type { PaginationProps } from "@rhoas/app-services-ui-components";
import { Pagination } from "@rhoas/app-services-ui-components";

export type PermissionsToolbarProps = {
  onDeleteSelected: (rowIndex: number[]) => void;
  checkedRows: number[];
  onChangeCheckedRows: (value: number[]) => void;
  onManagePermissions: () => void;
} & PaginationProps;

export const PermissionsToolbar: VFC<PermissionsToolbarProps> = ({
  onDeleteSelected,
  checkedRows,
  onChangeCheckedRows,
  onManagePermissions,
  onChange,
  page,
  perPage,
  itemCount,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSelect = () => {
    setIsOpen((prevState) => !prevState);
  };
  const onToggle: KebabToggleProps["onToggle"] = (value: boolean) => {
    setIsOpen(value);
  };

  const dropdownItems = [
    <DropdownItem
      key="delete_selected"
      onClick={() => {
        onDeleteSelected(checkedRows);
        onChangeCheckedRows([]);
      }}
      isDisabled={checkedRows.length > 0 ? false : true}
    >
      {t("delete_selected")}
    </DropdownItem>,
  ];
  const toolbarItems = (
    <>
      <ToolbarItem>
        <Button
          variant="primary"
          style={{ width: "100%" }}
          onClick={onManagePermissions}
        >
          {t("dialog_title")}
        </Button>
      </ToolbarItem>
      <ToolbarItem>
        <Dropdown
          onSelect={onSelect}
          toggle={
            <KebabToggle
              onToggle={onToggle}
              id="permissions-toolbar-kebab-toggle"
            />
          }
          isOpen={isOpen}
          isPlain
          dropdownItems={dropdownItems}
        />
      </ToolbarItem>
      <ToolbarItem variant="pagination" alignment={{ default: "alignRight" }}>
        <Pagination
          itemCount={itemCount}
          page={page}
          perPage={perPage}
          onChange={onChange}
        />
      </ToolbarItem>
    </>
  );
  return (
    <Toolbar>
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>
  );
};
