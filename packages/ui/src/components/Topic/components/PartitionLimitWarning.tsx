import { Button, Modal } from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { Topic } from "ui-models/src/models/topic";

export type PartitionLimitWarningProps = {
  topicData: Topic;
  onSave: (topicData: Topic) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  isCreate: boolean;
};

export const PartitionLimitWarning: React.FC<PartitionLimitWarningProps> = ({
  topicData,
  onSave,
  isModalOpen,
  setIsModalOpen,
  isCreate,
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
      {isCreate ? t("partition_warning_modal") : t("partition_increase")}
    </Modal>
  );
};
