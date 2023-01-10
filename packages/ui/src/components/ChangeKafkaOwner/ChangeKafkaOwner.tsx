import {
  Alert,
  AlertVariant,
  Button,
  Form,
  FormGroup,
  Modal,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectOwner } from "./SelectOwner";
import type { ChangeOwnerErrorMessage, OwnerAccount } from "./types";

export type ChangeKafkaOwnerProps = {
  isModalOpen: boolean;
  currentOwner: string;
  accounts: OwnerAccount[];
  onConfirm: (newOwner: string) => Promise<ChangeOwnerErrorMessage | undefined>;
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
  const [owner, setOwner] = useState<string | undefined>();
  const [errorCode, setErrorCode] = useState<
    ChangeOwnerErrorMessage | undefined
  >();

  const onConfirmOwner = () => {
    void onConfirm(owner || "").then((response) => setErrorCode(response));
  };

  const renderAlert = () => {
    switch (errorCode) {
      case "invalid-user":
        return (
          <Alert
            variant={AlertVariant.danger}
            aria-live="polite"
            isInline
            title={t("new_owner_does_not_exist_title")}
          >
            {t("new_owner_does_not_exist_message", {
              newOwner: owner,
            })}
          </Alert>
        );
      case "unknown-error":
        return (
          <Alert
            variant={AlertVariant.danger}
            aria-live="polite"
            isInline
            title={t("can_not_change_owner_title")}
          >
            {t("onwer_transfer_failed_message", {
              name: currentOwner,
            })}
          </Alert>
        );
    }
  };
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
          onClick={onConfirmOwner}
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
        {renderAlert()}
        <FormGroup fieldId="Current-owner-name" label={t("current_owner")}>
          {currentOwner}
        </FormGroup>
        <FormGroup fieldId="New-owner-name" label={t("new_owner")}>
          <SelectOwner
            accounts={accounts}
            owner={owner}
            onChangeOwner={setOwner}
            onChangeErrorCode={setErrorCode}
          />
        </FormGroup>
      </Form>
    </Modal>
  );
};
