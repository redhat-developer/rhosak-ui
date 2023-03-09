import {
  Button,
  ButtonVariant,
  Modal,
  ModalVariant,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { Trans } from "react-i18next";

export type TermsAndConditionsDialogProps = {
  isOpen: boolean;
  disableFocusTrap?: boolean;
  appendTo?: () => HTMLElement;
  onViewTerms: () => void;
  onCancel: () => void;
};

export const TermsAndConditionsDialog: VoidFunctionComponent<
  TermsAndConditionsDialogProps
> = ({ isOpen, disableFocusTrap, appendTo, onViewTerms, onCancel }) => {
  const { t } = useTranslation("terms-and-conditions");

  return (
    <Modal
      aria-label={t("title")}
      ouiaId={"terms-and-conditions-dialog"}
      variant={ModalVariant.small}
      isOpen={isOpen}
      title={t("title")}
      onClose={onCancel}
      appendTo={appendTo}
      disableFocusTrap={disableFocusTrap}
      actions={[
        <Button
          key={"confirm__button"}
          variant={ButtonVariant.primary}
          onClick={onViewTerms}
          ouiaId={"view_terms_and_conditions"}
        >
          {t("view_button")}
        </Button>,
        <Button
          key={"cancel__button"}
          variant={ButtonVariant.link}
          onClick={onCancel}
          ouiaId={"cancel"}
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <Trans
        ns={"terms-and-conditions"}
        i18nKey={"body"}
        components={{
          bold: <strong />,
          br: <br />,
        }}
      />
    </Modal>
  );
};
