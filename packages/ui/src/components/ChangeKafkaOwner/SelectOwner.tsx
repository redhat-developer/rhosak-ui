import type { FC } from "react";
import { useState } from "react";
import type { SelectProps } from "@patternfly/react-core";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import type { OwnerAccount } from "./types";
import { ChangeOwnerErrorMessage } from ".";

export type SelectOwnerProps = {
  accounts: OwnerAccount[];
  owner: string | undefined;
  onChangeOwner: (owner: string | undefined) => void;
  onChangeErrorCode: (value: ChangeOwnerErrorMessage | undefined) => void;
};

export const SelectOwner: FC<SelectOwnerProps> = ({
  accounts,
  owner,
  onChangeOwner,
  onChangeErrorCode,
}) => {
  const { t } = useTranslation("kafka");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (isExpanded: boolean) => {
    setIsOpen(isExpanded);
  };

  const onSelect: SelectProps["onSelect"] = (_, owner) => {
    onChangeOwner(owner as string);
    setIsOpen(false);
    onChangeErrorCode(undefined);
  };

  function selectOptions(filter = "") {
    const filterRegExp = new RegExp(filter, "i");
    const filteredAccounts =
      filter !== ""
        ? accounts.filter((account) => filterRegExp.test(account.displayName))
        : accounts;
    return filteredAccounts.map((account) => (
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
      selections={owner}
      onSelect={onSelect}
      onFilter={(_, value) => selectOptions(value)}
    >
      {selectOptions()}
    </Select>
  );
};
