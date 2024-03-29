import type React from "react";
import { useState } from "react";
import type { AZ } from "ui-models/src/models/kafka";
import type { Topic } from "ui-models/src/models/topic";
import { CreateTopicHead, CreateTopicWizard } from "../components";
import type { TopicForm } from "../components/types";

export type CreateTopicPageProps = {
  kafkaName: string;
  kafkaPageLink: string;
  kafkaInstanceLink: string;
  onSave: (topicData: TopicForm) => void;
  initialTopicValues: Topic;
  onCloseCreateTopic: () => void;
  checkTopicName: (value: string) => boolean;
  availablePartitionLimit: number;
  availabilityZone: AZ;
  isSaving: boolean;
};

export const CreateTopic: React.FC<CreateTopicPageProps> = ({
  kafkaName,
  kafkaPageLink,
  kafkaInstanceLink,
  onSave,
  initialTopicValues,
  onCloseCreateTopic,
  checkTopicName,
  availablePartitionLimit,
  availabilityZone,
  isSaving,
}) => {
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);

  return (
    <>
      <CreateTopicHead
        showAllOptions={isSwitchChecked}
        kafkaName={kafkaName}
        kafkaInstanceLink={kafkaInstanceLink}
        kafkaPageLink={kafkaPageLink}
        onShowAllOptions={setIsSwitchChecked}
      />
      <CreateTopicWizard
        isSwitchChecked={isSwitchChecked}
        onCloseCreateTopic={onCloseCreateTopic}
        onSave={onSave}
        topicData={initialTopicValues}
        checkTopicName={checkTopicName}
        availablePartitionLimit={availablePartitionLimit}
        availabilityZone={availabilityZone}
        isSaving={isSaving}
      />
    </>
  );
};
