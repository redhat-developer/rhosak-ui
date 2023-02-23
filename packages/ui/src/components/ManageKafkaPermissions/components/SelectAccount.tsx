import type React from "react";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Account } from "../types";
import { PrincipalType } from "../types";
import type { SelectProps } from "@patternfly/react-core";
import { Button, Form, Modal } from "@patternfly/react-core";
import { Skeleton } from "@patternfly/react-core";
import { FormGroup, Popover } from "@patternfly/react-core";
import {
  Divider,
  Select,
  SelectGroup,
  SelectOption,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";

export type SelectAccountProps = {
  accounts: Account[] | undefined;
  initialOpen?: boolean;
  kafkaName: string;
  id?: string;
  onNext: (selectedAccount: string | undefined) => void;
  onClose: () => void;
};

export const SelectAccount: React.VFC<SelectAccountProps> = ({
  accounts,
  initialOpen = false,
  kafkaName,
  id,
  onNext,
  onClose,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<string>();

  // for Storybook, allows opening the select programmatically respecting the initialization needed by the modal and Popper.js
  useLayoutEffect(() => setIsOpen(initialOpen), [initialOpen]);

  const onToggle = (newState: boolean) => {
    setIsOpen(newState);
  };

  const clearSelection = () => {
    setSelectedAccount(undefined);
    setIsDirty(true);
    setIsOpen(false);
  };

  const noServiceAccounts = [
    <SelectOption
      isNoResultsOption={true}
      isDisabled={true}
      key={t("no_results_found")}
    >
      {t("no_results_found")}
    </SelectOption>,
  ];
  const noUserAccounts = [
    <SelectOption
      isNoResultsOption={true}
      isDisabled={true}
      key={"no_user_accounts"}
    >
      {t("no_results_found")}
    </SelectOption>,
  ];

  function makeOptions(filterValue = "") {
    const filter = filterValue.toLowerCase();
    const filteredAccounts =
      filter !== ""
        ? accounts?.filter(
            (principal) =>
              principal.displayName.toLowerCase().includes(filter) ||
              principal.id.includes(filter)
          )
        : accounts;

    const serviceAccountOptions = filteredAccounts
      ?.filter(
        (principal) => principal.principalType === PrincipalType.ServiceAccount
      )
      .sort((a, b) =>
        a.displayName && b.displayName
          ? a.displayName.localeCompare(b.displayName)
          : -1
      )
      .map((principal, index) => (
        <SelectOption
          key={index}
          value={principal.id}
          description={principal.displayName}
        >
          {principal.id}
        </SelectOption>
      ));

    const userAccountOperations = filteredAccounts
      ?.filter(
        (principal) => principal.principalType === PrincipalType.UserAccount
      )
      .map((principal, index) => (
        <SelectOption
          key={index}
          value={principal.id}
          description={principal.displayName}
        >
          {principal.id}
        </SelectOption>
      ));

    return [
      <SelectGroup key="all_accounts_group">
        <SelectOption
          key={t("all_accounts_title")}
          value={t("all_accounts_title")}
          description={t("all_accounts_description")}
        >
          {t("all_accounts_title")}
        </SelectOption>
      </SelectGroup>,

      <Divider key="all_accounts_divider" />,
      <SelectGroup
        label={t("all_accounts_service_account_group")}
        key="service_accounts_group"
      >
        {serviceAccountOptions?.length
          ? serviceAccountOptions
          : noServiceAccounts}
      </SelectGroup>,
      <Divider key="user_account_divider2" />,
      <SelectGroup
        label={t("all_accounts_user_account_group")}
        key="user_accounts_group"
      >
        {userAccountOperations?.length ? userAccountOperations : noUserAccounts}
      </SelectGroup>,
    ];
  }

  const onSelect: SelectProps["onSelect"] = (_, value) => {
    setSelectedAccount(value as string);
    setIsDirty(false);
    setIsOpen(false);
  };

  const validated: ValidatedOptions = isDirty
    ? ValidatedOptions.error
    : ValidatedOptions.default;

  return (
    <Modal
      id="manage-permissions-modal"
      variant={"large"}
      isOpen={true}
      aria-label={t("dialog_aria_label")}
      position="top"
      title={t("dialog_title")}
      showClose={true}
      aria-describedby="modal-message"
      onClose={onClose}
      onEscapePress={onClose}
      appendTo={() =>
        id ? document.getElementById(id) || document.body : document.body
      }
      actions={[
        <Button
          key={1}
          variant="primary"
          isDisabled={
            selectedAccount == "" || selectedAccount == undefined ? true : false
          }
          onClick={() => onNext(selectedAccount)}
          aria-label={t("step_1_submit_button")}
        >
          {t("step_1_submit_button")}
        </Button>,
        <Button
          onClick={onClose}
          key={2}
          variant="secondary"
          aria-label={t("common:cancel")}
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup
          fieldId="kafka-instance-name"
          label={t("kafka_instance")}
          id="modal-message"
        >
          {kafkaName}
        </FormGroup>

        <FormGroup
          fieldId="account-name"
          validated={validated}
          helperTextInvalid={t("common:required")}
          isRequired
          label={t("account_id_title")}
          labelIcon={
            <Popover bodyContent={t("account_id_help")}>
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="pf-c-form__group-label-help"
                aria-label={t("account_help")}
              >
                <HelpIcon noVerticalAlign />
              </button>
            </Popover>
          }
        >
          {accounts ? (
            <Select
              id={"account-id"}
              data-testid="acls-select-account"
              className="kafka-ui--select--limit-height"
              variant={SelectVariant.typeahead}
              typeAheadAriaLabel={t("account_id_title")}
              maxHeight={400}
              onToggle={onToggle}
              onSelect={onSelect}
              onClear={clearSelection}
              selections={selectedAccount}
              onFilter={(_, value) => makeOptions(value)}
              isOpen={isOpen}
              placeholderText={t("account_id_typeahead_placeholder")}
              isCreatable
              menuAppendTo="parent"
              validated={validated}
              createText={t("resourcePrefix.create_text")}
              isGrouped
              onCreateOption={() => {
                setIsOpen(false);
                setIsDirty(false);
              }}
            >
              {makeOptions()}
            </Select>
          ) : (
            <Skeleton width={"100%"} />
          )}
        </FormGroup>
      </Form>
    </Modal>
  );
};
