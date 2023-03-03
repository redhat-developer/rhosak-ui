import type React from "react";
import { useState } from "react";
import type { AZ } from "ui-models/src/models/kafka";
import type { Topic } from "ui-models/src/models/topic";
import { CreateTopicHead, CreateTopicWizard } from "../components";

export type CreateTopicPageProps = {
  kafkaName: string;
  onKafkaPageLink: string;
  onKafkaInstanceLink: string;
  onSave: (topicData: Topic) => void;
  initialTopicValues: Topic;
  onCloseCreateTopic: () => void;
  checkTopicName: (value: string) => boolean;
  availablePartitionLimit: number;
  availabilityZone: AZ;
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
  availabilityZone,
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
        availabilityZone={availabilityZone}
      />
    </>
  );
};
