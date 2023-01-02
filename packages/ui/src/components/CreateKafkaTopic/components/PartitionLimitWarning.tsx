import { Button, Modal } from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { KafkaTopic } from "../../../types";

export type PartitionLimitWarningProps = {
  topicData: KafkaTopic;
  onSave: (topicData: KafkaTopic) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

export const PartitionLimitWarning: React.FC<PartitionLimitWarningProps> = ({
  topicData,
  onSave,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const handleModalToggle = () => {
    setIsModalOpen(false);
  };
  const onConfirm = () => {
    setIsModalOpen(false);
    onSave(topicData);
  };
  return (
    <Modal
      title={t("increase_partitions")}
      variant={"small"}
      titleIconVariant="warning"
      aria-describedby="modal-title-icon-description"
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      actions={[
        <Button key="confirm" variant="primary" onClick={onConfirm}>
          {t("common:yes")}
        </Button>,
        <Button key="cancel" variant="link" onClick={handleModalToggle}>
          {t("no_return")}
        </Button>,
      ]}
    >
      {t("partition_warning_modal")}
    </Modal>
  );
};
