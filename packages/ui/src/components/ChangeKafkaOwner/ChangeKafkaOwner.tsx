import {
  Alert,
  AlertGroup,
  AlertVariant,
  Button,
  Form,
  FormGroup,
  Modal,
} from "@patternfly/react-core";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectOwner } from "./SelectOwner";
import { OwnerAccount } from "./types";

export type ChangeKafkaOwnerProps = {
  isModalOpen: boolean;
  currentOwner: string;
  accounts: OwnerAccount[];
  selectedAccount: string | undefined;
  onChangeOwner: () => void;
  onCancel: () => void;
  onChangeAccount: (value: string | undefined) => void;
};

export const ChangeKafkaOwner: FunctionComponent<ChangeKafkaOwnerProps> = ({
  isModalOpen,
  currentOwner,
  accounts,
  selectedAccount,
  onChangeOwner,
  onCancel,
  onChangeAccount,
}) => {
  const { t } = useTranslation(["kafka", "common"]);
  return (
    <Modal
      id="change-owner-modal"
      title={t("change-owner-title")}
      isOpen={isModalOpen}
      onClose={onCancel}
      variant={"medium"}
      position="top"
      actions={[
        <Button
          id="confirm-button"
          key="changeowner"
          variant="primary"
          onClick={onChangeOwner}
        >
          {t("change-owner-button")}
        </Button>,
        <Button
          id="cancel-button"
          key="cancel"
          variant="link"
          onClick={onCancel}
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <Form onSubmit={(e) => e?.preventDefault()}>
        <FormGroup fieldId="Current-owner-name" label={t("current_owner")}>
          {currentOwner}
        </FormGroup>
        <FormGroup fieldId="New-owner-name" label={t("new_owner")}>
          <SelectOwner
            value={selectedAccount}
            accounts={accounts}
            onChangeOwner={onChangeAccount}
          />
        </FormGroup>
      </Form>
    </Modal>
  );
};
