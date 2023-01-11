import {
  Alert,
  AlertVariant,
  Button,
  Form,
  FormGroup,
  Modal,
  Skeleton,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectOwner } from "./SelectOwner";
import type { ChangeOwnerErrorMessage, OwnerAccount } from "./types";

export type ChangeKafkaOwnerProps = {
  currentOwner: string;
  accounts: OwnerAccount[] | undefined;
  savingState: "idle" | "saving" | ChangeOwnerErrorMessage;
  onConfirm: (newOwner: string) => void;
  onCancel: () => void;
};

export const ChangeKafkaOwner: FunctionComponent<ChangeKafkaOwnerProps> = ({
  currentOwner,
  accounts,
  savingState,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation(["kafka", "common"]);
  const [account, setAccount] = useState<string | undefined>();
  const submittedAccount = useRef<string>();

  const isSaving = savingState === "saving";

  const onConfirmOwner = useCallback(() => {
    if (account) {
      submittedAccount.current = account;
      onConfirm(account);
    }
  }, [onConfirm, account]);

  const renderAlert = () => {
    switch (savingState) {
      case "invalid-user":
        return (
          <Alert
            variant={AlertVariant.danger}
            aria-live="polite"
            isInline
            title={t("new_owner_does_not_exist_title")}
          >
            {t("new_owner_does_not_exist_message", {
              newOwner: submittedAccount.current,
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
            {t("owner_transfer_failed_message", {
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
      isOpen={true}
      onClose={onCancel}
      variant={"medium"}
      position="top"
      actions={[
        <Button
          id="confirm-button"
          key="changeowner"
          variant="primary"
          isDisabled={isSaving}
          onClick={onConfirmOwner}
        >
          {t("change-owner-button")}
        </Button>,
        <Button
          id="cancel-button"
          key="cancel"
          variant="link"
          onClick={onCancel}
          isDisabled={isSaving}
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
          {accounts ? (
            <SelectOwner
              isDisabled={isSaving}
              accounts={accounts}
              owner={account}
              onChangeOwner={setAccount}
            />
          ) : (
            <Skeleton width={"100%"} />
          )}
        </FormGroup>
      </Form>
    </Modal>
  );
};
