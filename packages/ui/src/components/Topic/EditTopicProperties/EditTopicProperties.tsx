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
import { retentionSizeTransformer } from "../components/retentionSizeTransformer";
import { retentionTimeTransformer } from "../components/retentionTimeTransformer";

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
  const [customTimeValue, setCustomTimeValue] = useState<CustomSelect>({
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
        topic["retention.bytes"].value != BigInt(-1)
          ? Number(bytesToSizeValue.value)
          : 1,
    });

  const [radioTimeSelectValue, setRadioTimeSelectValue] =
    useState<RadioSelectType>(
      topic["retention.ms"].value == BigInt(-1) ? "unlimited" : "custom"
    );

  const [radioSizeSelectValue, setRadioSizeSelectValue] =
    useState<RetentionSizeRadioSelect>(
      topic["retention.bytes"].value == BigInt(-1) ? "unlimited" : "custom"
    );

  const [topicData, setTopicData] = useState<Topic>(topic);

  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const onSaveTopic = (transformedTopic: Topic) => {
    if (topicData.partitions.length >= availablePartitionLimit)
      setWarningModalOpen(true);
    else onSave(transformedTopic);
  };

  const onTransform = () => {
    const tranformedValueInMilliseconds =
      topicData["retention.ms"].value == BigInt(-1)
        ? BigInt(-1)
        : retentionTimeTransformer(customTimeValue);
    const tranformedValueInBytes =
      topicData["retention.bytes"].value == BigInt(-1)
        ? BigInt(-1)
        : retentionSizeTransformer(customRetentionSizeValue);
    const transformedTopic: Topic = {
      ...topicData,
      "retention.ms": {
        type: "ms",
        value: tranformedValueInMilliseconds || BigInt(-1),
      },
      "retention.bytes": { type: "bytes", value: tranformedValueInBytes },
    };
    onSaveTopic(transformedTopic);
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
        onConfirm={onTransform}
        handleCancel={onCancel}
        topicData={topicData}
        setTopicData={setTopicData}
        availablePartitionLimit={availablePartitionLimit}
        customRetentionSizeValue={customRetentionSizeValue}
        setCustomRetentionSizeValue={setCustomRetentionSizeValue}
        customTimeValue={customTimeValue}
        setCustomTimeValue={setCustomTimeValue}
        radioTimeSelectValue={radioTimeSelectValue}
        setRadioTimeSelectValue={setRadioTimeSelectValue}
        radioSizeSelectValue={radioSizeSelectValue}
        setRadioSizeSelectValue={setRadioSizeSelectValue}
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
