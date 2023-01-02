import type { NumberInputProps } from "@patternfly/react-core";
import {
  Form,
  FormGroup,
  FormSection,
  NumberInput,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type React from "react";
import type { KafkaTopic } from "../../../types";

export type StepPartitionsProps = {
  newTopicData: KafkaTopic;
  onPartitionsChange: (value: KafkaTopic) => void;
  availablePartitionLimit: number;
};

export const StepPartitions: React.FC<StepPartitionsProps> = ({
  newTopicData,
  onPartitionsChange,
  availablePartitionLimit,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const handleOnPlus = () => {
    onPartitionsChange({
      ...newTopicData,
      partitionsCount: newTopicData.partitionsCount + 1,
    });
  };

  const handleOnMinus = () => {
    onPartitionsChange({
      ...newTopicData,
      partitionsCount: newTopicData.partitionsCount - 1,
    });
  };

  const handlePartitionTouchspinChange: NumberInputProps["onChange"] = (
    event
  ) => {
    onPartitionsChange({
      ...newTopicData,
      partitionsCount: Number((event.target as HTMLInputElement).value),
    });
  };
  const onBlur = () => {
    if (newTopicData.partitionsCount < 1)
      onPartitionsChange({ ...newTopicData, partitionsCount: 1 });
  };

  return (
    <Form>
      <FormSection title={t("partitions")} id="partitions" titleElement={"h2"}>
        <TextContent>
          <Text component={TextVariants.p}>{t("partition_info")}</Text>
          <Text component={TextVariants.small}>{t("partition_info_note")}</Text>
        </TextContent>

        <FormGroup
          label="Partitions"
          fieldId="step-topic-name-form"
          helperText={
            newTopicData.partitionsCount >= availablePartitionLimit
              ? t("partitions_warning")
              : t("partition_helper_text")
          }
          validated={
            newTopicData.partitionsCount >= availablePartitionLimit
              ? "warning"
              : "default"
          }
          isRequired
        >
          <NumberInput
            onPlus={handleOnPlus}
            onMinus={handleOnMinus}
            value={Number(newTopicData.partitionsCount)}
            inputName="input"
            onChange={handlePartitionTouchspinChange}
            widthChars={20}
            onBlur={onBlur}
          />
        </FormGroup>
      </FormSection>
    </Form>
  );
};
