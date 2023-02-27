import type React from "react";
import { useState } from "react";
import type { Topic } from "ui-models/src/models/topic";
import { CreateTopicHead, CreateTopicWizard } from "../components";

export type CreateTopicPageProps = {
  kafkaName: string;
  onKafkaPageLink: () => void;
  onKafkaInstanceLink: () => void;
  onSave: (topicData: Topic) => void;
  initialTopicValues: Topic;
  onCloseCreateTopic: () => void;
  checkTopicName: (value: string) => boolean;
  availablePartitionLimit: number;
};

export const CreateTopic: React.FC<CreateTopicPageProps> = ({
  kafkaName,
  onKafkaPageLink,
  onKafkaInstanceLink,
  onSave,
  initialTopicValues,
  onCloseCreateTopic,
  checkTopicName,
  availablePartitionLimit,
}) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);

  return (
    <>
      <CreateTopicHead
        showAllOptions={isSwitchChecked}
        kafkaName={kafkaName}
        onKafkaInstanceLink={onKafkaInstanceLink}
        onKafkaPageLink={onKafkaPageLink}
        onShowAllOptions={setIsSwitchChecked}
      />
      <CreateTopicWizard
        isSwitchChecked={isSwitchChecked}
        onCloseCreateTopic={onCloseCreateTopic}
        onSave={onSave}
        initialFieldsValue={initialTopicValues}
        checkTopicName={checkTopicName}
        availablePartitionLimit={availablePartitionLimit}
      />
    </>
  );
};
