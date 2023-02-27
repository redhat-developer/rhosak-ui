import type { NumberInputProps } from "@patternfly/react-core";
import {
  FormSection,
  NumberInput,
  Radio,
  Stack,
  Text,
  TextContent,
  TextInput,
  TextVariants,
  ValidatedOptions,
} from "@patternfly/react-core";
import {
  FormGroupWithPopover,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import type { Topic } from "ui-models/src/models/topic";
import { CustomRetentionMessage } from "./CustomRetentionMessage";
import { CustomRetentionSize } from "./CustomRetentionSize";
import { TextWithLabelPopover } from "./TextWithLabelPopover";
import type {
  CustomRetentionSizeSelect,
  CustomSelect,
  RadioSelectType,
  RetentionSizeRadioSelect,
} from "./types";
import { useValidateTopic } from "./useValidateTopic";

export type CoreConfigurationProps = {
  isCreate?: boolean;
  topicData: Topic;
  setTopicData: (data: Topic) => void;
  //initialPartition: number | undefined;
  invalidText: string;
  setInvalidText: (message: string) => void;
  setTopicValidated: (error: ValidatedOptions) => void;
  topicValidated: ValidatedOptions;
  setWarning: (isWarning: boolean) => void;
  warning: boolean;
  availablePartitionLimit: number;
  customRetentionSizeValue: CustomRetentionSizeSelect;
  setCustomRetentionSizeValue: (data: CustomRetentionSizeSelect) => void;
  customValue: CustomSelect;
  setCustomValue: (data: CustomSelect) => void;
  radioSelectValue: RadioSelectType;
  setRadioSelectValue: (value: RadioSelectType) => void;
  customRetentionRadioSelect: RetentionSizeRadioSelect;
  setCustomRetentionRadioSelect: (data: RetentionSizeRadioSelect) => void;
};

const CoreConfiguration: FunctionComponent<CoreConfigurationProps> = ({
  isCreate,
  topicData,
  setTopicData,
  invalidText,
  setInvalidText,
  setTopicValidated,
  topicValidated,
  availablePartitionLimit,
  customValue,
  setCustomValue,
  radioSelectValue,
  setRadioSelectValue,
  setCustomRetentionSizeValue,
  customRetentionSizeValue,
  customRetentionRadioSelect,
  setCustomRetentionRadioSelect,
}) => {
  const { t } = useTranslation(["create-topic"]);
  const { validateName } = useValidateTopic();

  const validationCheck = useCallback(
    (value: string) => {
      const errorMessage = validateName(value);
      if (errorMessage) {
        setInvalidText(errorMessage);
        setTopicValidated(ValidatedOptions.error);
      } else {
        setTopicValidated(ValidatedOptions.default);
      }
    },
    [setInvalidText, setTopicValidated, validateName]
  );

  const handleRetentionMessageTime = (value: RadioSelectType) => {
    if (value === "unlimited") {
      setTopicData({
        ...topicData,
        "retention.ms": { value: BigInt(-1), type: "ms" },
      });
    }
    setRadioSelectValue(value);
  };

  const handleRetentionMessageSize = (value: RetentionSizeRadioSelect) => {
    if (value === "unlimited") 
      setTopicData({
        ...topicData,
        "retention.bytes": { value: BigInt(-1), type:"bytes" },
      });
      setCustomRetentionRadioSelect(value);
    }
  

  const handleTextInputChange = (value: string) => {
    validationCheck(value);
    setTopicData({ ...topicData, name: value });
  };

  const onPartitionsChange: NumberInputProps["onChange"] = (event) => {
    const partitions = Number((event.target as HTMLInputElement).value);
    const updatedPartitions = Array(partitions)
      .fill(null)
      .map((_, index) => ({ partition: index }));
    setTopicData({
      ...topicData,
      partitions: updatedPartitions,
    });
  };

  const handleOnPlus = () => {
    const currentPartitions = topicData.partitions;
    const updatedPartitions = [
      ...currentPartitions,
      { partition: currentPartitions.length },
    ];
    setTopicData({
      ...topicData,
      partitions: updatedPartitions,
    });
  };

  const handleOnMinus = () => {
    const { partitions } = topicData;
    const newPartitions = partitions.slice(0, partitions.length - 1);
    setTopicData({
      ...topicData,
      partitions: newPartitions,
    });
  };

  const retentionTimeInput = (
    <CustomRetentionMessage
      customValue={customValue}
      setCustomValue={setCustomValue}
    />
  );

  const retentionSizeInput = (
    <CustomRetentionSize
      customRetentionSizeValue={customRetentionSizeValue}
      setCustomRetentionSizeValue={setCustomRetentionSizeValue}
    />
  );

  return (
    <FormSection
      title={t("core_configuration")}
      id="core-configuration"
      titleElement={"h2"}
    >
      <TextContent>
        <Text component={TextVariants.p} className="section-info">
          {t("core_config_info")}
        </Text>
      </TextContent>
      {isCreate ? (
        <FormGroupWithPopover
          labelHead={t("topic_name")}
          fieldId="create-topic-name"
          fieldLabel={t("topic_name")}
          labelBody={t("topic_name_description")}
          buttonAriaLabel="More info for topic name field"
          helperTextInvalid={invalidText}
          validated={topicValidated}
          isRequired={true}
          helperText={t("topic_name_helper_text")}
        >
          <TextInput
            isRequired
            type="text"
            id="create-topic-name"
            name="name"
            value={topicData.name}
            onChange={handleTextInputChange}
            label={t("topic_name")}
            placeholder={t("enter_name")}
            validated={topicValidated}
          />
        </FormGroupWithPopover>
      ) : (
        <TextWithLabelPopover
          fieldId="topic-name"
          btnAriaLabel="topic detail name"
          fieldLabel="Name"
          fieldValue={topicData.name}
          popoverBody={t("topic_name_description")}
          popoverHeader={t("topic_name")}
        />
      )}

      <FormGroupWithPopover
        fieldId="create-topic-partitions"
        fieldLabel="Partitions"
        labelHead={t("partitions")}
        labelBody={t("partitions_description")}
        buttonAriaLabel="More info for partitions field"
        helperText={
          topicData.partitions.length >= availablePartitionLimit
            ? t("partitions_warning")
            : t("partition_helper_text")
        }
        validated={
          topicData.partitions.length >= availablePartitionLimit
            ? "warning"
            : "default"
        }
      >
        <NumberInput
          id="create-topic-partitions"
          inputName="num-partitions"
          onChange={onPartitionsChange}
          data-testid={t("partitions")}
          onPlus={handleOnPlus}
          onMinus={handleOnMinus}
          value={topicData.partitions.length}
          plusBtnProps={{ name: "num-partitions" }}
          minusBtnProps={{ name: "num-partitions" }}
          min={0}
        />
      </FormGroupWithPopover>

      <TextWithLabelPopover
        fieldId="replicas"
        btnAriaLabel={t("replicas")}
        fieldLabel={t("replicas")}
        fieldValue={"3" /* TODO */}
        popoverBody={t("replicas_description")}
        popoverHeader={t("replicas")}
      />
      <TextWithLabelPopover
        fieldId="min-insync-replicas"
        btnAriaLabel="topic detail min-in-sync replica"
        fieldLabel="Minimum in-sync replicas"
        fieldValue={topicData["min.insync.replicas"].toString()}
        popoverBody={t("min_insync_replicas_description")}
        popoverHeader={t("min_insync_replicas")}
      />
      <FormGroupWithPopover
        fieldId="retention"
        fieldLabel="Retention time"
        labelHead={t("retention_time")}
        labelBody={t("retention_time_description")}
        buttonAriaLabel="More info for retention time field"
      >
        <Stack hasGutter>
          <Radio
            isChecked={radioSelectValue != "unlimited"}
            name="custom-retention-time"
            onChange={() => handleRetentionMessageTime("custom")}
            label={retentionTimeInput}
            className="kafka-ui--radio-label__number-input"
            aria-label="custom duration"
            id="custom-retention-time"
            value={radioSelectValue}
          />
          <Radio
            isChecked={radioSelectValue == "unlimited"}
            name="unlimited-retention-time"
            onChange={() => handleRetentionMessageTime("unlimited")}
            label="Unlimited time"
            aria-label="Unlimited"
            id="unlimited-retention-time"
            value={radioSelectValue}
          />
        </Stack>
      </FormGroupWithPopover>
      <FormGroupWithPopover
        fieldId="retention-size"
        fieldLabel="Retention size"
        labelHead={t("retention_size")}
        labelBody={t("retention_size_description")}
        buttonAriaLabel="More info for retention size field"
      >
        <Stack hasGutter>
          <Radio
            isChecked={customRetentionRadioSelect === "custom"}
            name="custom-retention-size"
            onChange={() => handleRetentionMessageSize("custom")}
            label={retentionSizeInput}
            className="kafka-ui--radio-label__number-input"
            aria-label="custom size"
            id="custom-retention-size"
            value={customRetentionRadioSelect}
          />
          <Radio
            isChecked={customRetentionRadioSelect === "unlimited"}
            name="unlimited-retention-size"
            onChange={() => handleRetentionMessageSize("unlimited")}
            label="Unlimited size"
            aria-label="Unlimited"
            id="unlimited-retention-size"
            value={customRetentionRadioSelect}
          />
        </Stack>
      </FormGroupWithPopover>
    </FormSection>
  );
};

export { CoreConfiguration };
