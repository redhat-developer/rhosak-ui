import { PageSection } from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useState } from "react";
import type { Topic } from "ui-models/src/models/topic";
import { TopicAdvancePage } from "../components/TopicAdvancePage";
import { PartitionLimitWarning } from "../components";
import type {
  CustomSelect,
  CustomRetentionSizeSelect,
  RadioSelectType,
  RetentionSizeRadioSelect,
  TimeUnit,
} from "../../";
import { bytesToMemorySize, millisecondsToTime } from "../../KafkaTopics/types";
import type { CustomRetentionUnit } from "../components/types";

export type EditTopicPropertiesProps = {
  topic: Topic;
  onCancel: () => void;
  onSave: (data: Topic) => void;
  availablePartitionLimit: number;
};

export const EditTopicProperties: FunctionComponent<
  EditTopicPropertiesProps
> = ({ topic, onCancel, onSave, availablePartitionLimit }) => {
  const millisecondsToTimeValue = millisecondsToTime(
    topic["retention.ms"].value
  );
  const bytesToSizeValue = bytesToMemorySize(topic["retention.bytes"].value);
  const [customValue, setCustomValue] = useState<CustomSelect>({
    unit:
      topic["retention.ms"].value != BigInt(-1)
        ? (millisecondsToTimeValue.unit as TimeUnit)
        : "days",
    value:
      topic["retention.ms"].value != BigInt(-1)
        ? Number(millisecondsToTimeValue.value)
        : 7,
  });

  const [customRetentionSizeValue, setCustomRetentionSizeValue] =
    useState<CustomRetentionSizeSelect>({
      unit:
        topic["retention.bytes"].value != BigInt(-1)
          ? (bytesToSizeValue.unit as CustomRetentionUnit)
          : "bytes",
      value:
        topic["retention.ms"].value != BigInt(-1)
          ? Number(millisecondsToTimeValue.value)
          : 7,
    });

  const [radioSelectValue, setRadioSelectValue] = useState<RadioSelectType>(
    topic["retention.ms"].value == BigInt(-1) ? "unlimited" : "custom"
  );

  const [customRetentionRadioSelect, setCustomRetentionRadioSelect] =
    useState<RetentionSizeRadioSelect>("unlimited");

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
        customRetentionSizeValue={customRetentionSizeValue}
        setCustomRetentionSizeValue={setCustomRetentionSizeValue}
        customValue={customValue}
        setCustomValue={setCustomValue}
        radioSelectValue={radioSelectValue}
        setRadioSelectValue={setRadioSelectValue}
        customRetentionRadioSelect={customRetentionRadioSelect}
        setCustomRetentionRadioSelect={setCustomRetentionRadioSelect}
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
