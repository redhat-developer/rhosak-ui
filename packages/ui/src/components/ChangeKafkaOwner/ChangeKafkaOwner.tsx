import {
  Button,
  Form,
  FormGroup,
  Modal,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectOwner } from "./SelectOwner";
import type { OwnerAccount } from "./types";

export type ChangeKafkaOwnerProps = {
  isModalOpen: boolean;
  currentOwner: string;
  accounts: OwnerAccount[];
  onConfirm: () => void;
  onCancel: () => void;
};

export const ChangeKafkaOwner: FunctionComponent<ChangeKafkaOwnerProps> = ({
  isModalOpen,
  currentOwner,
  accounts,
  onConfirm,
  onCancel,
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
          onClick={onConfirm}
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
            accounts={accounts}
          />
        </FormGroup>
      </Form>
    </Modal>
  );
};
