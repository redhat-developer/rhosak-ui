import { PageSection } from "@patternfly/react-core";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Topic } from "ui-models/src/models/topic";
import { TopicAdvancePage } from "../components/TopicAdvancePage";
import { PartitionLimitWarning } from "../components/PartitionLimitWarning";

export type EditTopicPropertiesProps = {
  topic: Topic;
  onCancel: () => void;
  onSave: (data: Topic) => void;
  availablePartitionLimit: number;
};

export const EditTopicProperties: FunctionComponent<
  EditTopicPropertiesProps
> = ({ topic, onCancel, onSave, availablePartitionLimit }) => {
  const { t } = useTranslation(["create-topic"]);

  const [topicData, setTopicData] = useState<Topic>(topic);

  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const onSaveTopic = () => {
    if (topicData.partitions.length >= availablePartitionLimit)
      setWarningModalOpen(true);
    else onSave(topicData);
  };
  return (
    <PageSection
      variant={"light"}
      className={"topic-properties"}
      hasOverflowScroll={true}
      aria-label={"TODO"}
    >
      <TopicAdvancePage
        isCreate={false}
        onConfirm={onSaveTopic}
        handleCancel={onCancel}
        topicData={topicData}
        setTopicData={setTopicData}
        availablePartitionLimit={availablePartitionLimit}
      />
      {warningModalOpen && (
        <PartitionLimitWarning
          topicData={topicData}
          onSave={onSave}
          isModalOpen={warningModalOpen}
          setIsModalOpen={setWarningModalOpen}
        />
      )}
    </PageSection>
  );
};
