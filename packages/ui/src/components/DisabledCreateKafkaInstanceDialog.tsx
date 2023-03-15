import { Modal, ModalVariant } from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export type DisabledCreateKafkaInstanceDialogProps = {
  /**
   *
   * Flag to show the modal
   */
  isModalOpen: boolean;

  /**
   * Set this to `true` on Storybook when there are multiple modals open at a time.
   */
  disableFocusTrap?: boolean;
  /**
   * The parent container to append the modal to. Defaults to document.body
   */
  appendTo?: () => HTMLElement;

  /**
   * A callback for when the cancel or close button are clicked.
   */
  onConfirm: () => void;
};
export const DisabledCreateKafkaInstanceDialog: VoidFunctionComponent<
  DisabledCreateKafkaInstanceDialogProps
> = ({ isModalOpen, appendTo, onConfirm, disableFocusTrap }) => {
  const { t } = useTranslation("create-kafka-instance");

  return (
    <Modal
      id="modalCreateKafkaDisabled"
      variant={ModalVariant.small}
      title={t("create_instance_title")}
      disableFocusTrap={disableFocusTrap}
      isOpen={isModalOpen}
      ouiaId="modal-create-kafka"
      onClose={onConfirm}
      appendTo={appendTo}
      position="top"
      titleIconVariant={"info"}
    >
      {t("instance_creation_disabled")}
    </Modal>
  );
};
