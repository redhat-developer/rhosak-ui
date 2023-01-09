import { FC, useState } from "react";
import {
  Select,
  SelectOption,
  SelectOptionObject,
  SelectProps,
  SelectVariant,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { OwnerAccount } from "./types";

export type SelectOwnerProps = {
  value: string | undefined;
  accounts: OwnerAccount[];
  onChangeOwner: (value: string | undefined) => void;
};

export const SelectOwner: FC<SelectOwnerProps> = ({
  value,
  accounts,
  onChangeOwner,
}) => {
  const { t } = useTranslation("kafka");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (isExpanded: boolean) => {
    setIsOpen(isExpanded);
  };

  const onSelect: SelectProps["onSelect"] = (_, owner) => {
    onChangeOwner(owner as string);
    setIsOpen(false);
  };

  function selectOptions(filter = "") {
    const filterRegExp = new RegExp(filter, "i");
    const filteredAccounts =
      filter !== ""
        ? accounts.filter((account) => filterRegExp.test(account.displayName))
        : accounts;
    return filteredAccounts.map((account, index) => (
      <SelectOption
        key={account.id}
        value={account.id}
        description={account.displayName}
      >
        {account.id}
      </SelectOption>
    ));
  }

  return (
    <Select
      id="change-permission-owner-select"
      variant={SelectVariant.typeahead}
      onToggle={onToggle}
      isOpen={isOpen}
      placeholderText={t("select_user_account")}
      isCreatable={true}
      createText={t("change_owner_create_text")}
      menuAppendTo="parent"
      maxHeight={400}
      selections={value}
      onSelect={onSelect}
      onFilter={(_, value) => selectOptions(value)}
    >
      {selectOptions()}
    </Select>
  );
};
