import { PageSection } from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { Topic } from "ui-models/src/models/topic";
import { TopicAdvancePage } from "../components/TopicAdvancePage";

export type EditTopicPropertiesProps = {
  topic: Topic;
  onCancel: () => void;
};

export const EditTopicProperties: FunctionComponent<
  EditTopicPropertiesProps
> = ({ topic }) => {
  const { t } = useTranslation(["create-topic"]);
  return (
    <PageSection
      variant={"light"}
      className={"topic-properties"}
      hasOverflowScroll={true}
    >
      <TopicAdvancePage
        isCreate={false}
        onConfirm={() => {}}
        handleCancel={() => {}}
        topicData={topic}
        setTopicData={() => {}}
        checkTopicName={() => Promise.resolve(true)}
        availablePartitionLimit={3}
      />
    </PageSection>
  );
};
