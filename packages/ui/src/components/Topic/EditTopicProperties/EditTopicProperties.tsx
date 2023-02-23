import { PageSection } from "@patternfly/react-core";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Topic } from "ui-models/src/models/topic";
import { TopicAdvancePage } from "../components/TopicAdvancePage";

export type EditTopicPropertiesProps = {
  topic: Topic;
  onCancel: () => void;
  checkTopicName: (value: string) => Promise<boolean>;
  onConfirm: () => void
};

export const EditTopicProperties: FunctionComponent<
  EditTopicPropertiesProps
> = ({ topic, onCancel, checkTopicName, onConfirm }) => {
  const { t } = useTranslation(["create-topic"]);

  const [topicData, setTopicData] = useState<Topic>(topic);

  return (
    <PageSection
      variant={"light"}
      className={"topic-properties"}
      hasOverflowScroll={true}
      aria-label={"TODO"}
    >
      <TopicAdvancePage
        isCreate={false}
        onConfirm={onConfirm}
        handleCancel={onCancel}
        topicData={topicData}
        setTopicData={setTopicData}
        checkTopicName={checkTopicName}
        availablePartitionLimit={3}
      />
    </PageSection>
  );
};
