import { PageSection, ValidatedOptions } from "@patternfly/react-core";
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
import type { CustomRetentionUnit, TopicForm } from "../components/types";
import type { CleanupPolicy } from "ui-models/src/types";

export type EditTopicPropertiesProps = {
  topic: Topic;
  onCancel: () => void;
  onSave: (data: TopicForm) => void;
  availablePartitionLimit: number;
  isSaving: boolean;
};

export const EditTopicProperties: FunctionComponent<
  EditTopicPropertiesProps
> = ({ topic, onCancel, onSave, availablePartitionLimit, isSaving }) => {
  const millisecondsToTimeValue = millisecondsToTime(
    topic["retention.ms"].value
  );
  const [initialPartitions] = useState<number>(topic.partitions.length);
  const [retentionTimeValidated, setRetentionTimeValidated] =
    useState<ValidatedOptions>(ValidatedOptions.default);
  const [retentionSizeValidated, setRetentionSizeValidated] =
    useState<ValidatedOptions>(ValidatedOptions.default);
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
  const [topicName, setTopicName] = useState<string>(topic.name);
  const [cleanupPolicy, setCleanupPolicy] = useState<CleanupPolicy>(
    topic["cleanup.policy"]
  );
  const [partitions, setPartitions] = useState<number>(topic.partitions.length);

  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const validateRetentionTime = () => {
    switch (radioTimeSelectValue) {
      case "custom":
        return customTimeValue.value == 0 ? false : true;
      default:
        return true;
    }
  };
  const validateRetentionSize = () => {
    switch (radioSizeSelectValue) {
      case "custom":
        return customRetentionSizeValue.value == 0 ? false : true;
      default:
        return true;
    }
  };

  const onConfirmSave = () => {
    const isRetentionTimeValid = validateRetentionTime();
    const isRetentionSizeValid = validateRetentionSize();
    if (!isRetentionTimeValid)
      setRetentionTimeValidated(ValidatedOptions.error);
    if (!isRetentionSizeValid)
      setRetentionSizeValidated(ValidatedOptions.error);
    if (
      isRetentionTimeValid &&
      isRetentionSizeValid &&
      partitions > initialPartitions
    )
      setWarningModalOpen(true);
    else if (isRetentionTimeValid && isRetentionSizeValid) onTransform();
  };

  const retentionTimeTransform: CustomSelect =
    radioTimeSelectValue == "unlimited"
      ? { value: -1, unit: "unlimited" }
      : radioTimeSelectValue == "day"
      ? { value: 1, unit: "days" }
      : radioTimeSelectValue == "week"
      ? { value: 1, unit: "weeks" }
      : customTimeValue;

  const onTransform = () => {
    const topicValues: TopicForm = {
      name: topicName,
      partitions: partitions,
      retentionTime: retentionTimeTransform,
      retentionSize:
        radioSizeSelectValue == "unlimited"
          ? { value: -1, unit: "unlimited" }
          : customRetentionSizeValue,
      cleanupPolicy: cleanupPolicy,
    };

    onSave(topicValues);
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
        onConfirm={onConfirmSave}
        handleCancel={onCancel}
        topicData={topic}
        topicName={topicName}
        onCleanupPolicyChange={setCleanupPolicy}
        availablePartitionLimit={availablePartitionLimit}
        customRetentionSizeValue={customRetentionSizeValue}
        setCustomRetentionSizeValue={setCustomRetentionSizeValue}
        customTimeValue={customTimeValue}
        setCustomTimeValue={setCustomTimeValue}
        radioTimeSelectValue={radioTimeSelectValue}
        setRadioTimeSelectValue={setRadioTimeSelectValue}
        radioSizeSelectValue={radioSizeSelectValue}
        setRadioSizeSelectValue={setRadioSizeSelectValue}
        onTopicNameChange={setTopicName}
        partitions={partitions}
        onPartitionsChange={setPartitions}
        cleanupPolicy={cleanupPolicy}
        isSaving={isSaving}
        retentionTimeValidated={retentionTimeValidated}
        retentionSizeValidated={retentionSizeValidated}
        onChangeRetentionSizeValidated={setRetentionSizeValidated}
        onChangeRetentionTimeValidated={setRetentionTimeValidated}
        initialPartitions={initialPartitions}
      />
      {warningModalOpen && (
        <PartitionLimitWarning
          topicData={topic}
          onSave={onTransform}
          isModalOpen={warningModalOpen}
          setIsModalOpen={setWarningModalOpen}
          isCreate={false}
        />
      )}
    </PageSection>
  );
};
