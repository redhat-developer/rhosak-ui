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

export type PermissionsToolbarProps = {
  onDeleteSelected: (rowIndex: number[]) => void;
  checkedRows: number[];
};

export const PermissionsToolbar: VFC<PermissionsToolbarProps> = ({
  onDeleteSelected,
  checkedRows,
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
      onClick={() => onDeleteSelected(checkedRows)}
      isDisabled={checkedRows.length>0 ? false : true}
    >
      {t("delete_selected")}
    </DropdownItem>,
  ];
  const toolbarItems = (
    <>
      <ToolbarItem>
        <Button variant="primary" style={{ width: "100%" }}>
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
    </>
  );
  return (
    <Toolbar>
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>
  );
};
