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
import type { Topic } from "ui-models/src/models/topic";

export type StepPartitionsProps = {
  newTopicData: Topic;
  onPartitionsChange: (value: Topic) => void;
  availablePartitionLimit: number;
};

export const StepPartitions: React.FC<StepPartitionsProps> = ({
  newTopicData,
  onPartitionsChange,
  availablePartitionLimit,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const handleOnPlus = () => {
    // onPartitionsChange({
    //   ...newTopicData,
    //   partitions.length: newTopicData.partitions.length + 1,
    // });
  };

  const handleOnMinus = () => {
    // onPartitionsChange({
    //   ...newTopicData,
    //   partitions.length: newTopicData.partitions.length - 1,
    // });
  };

  const handlePartitionTouchspinChange: NumberInputProps["onChange"] = (
    event
  ) => {
    // onPartitionsChange({
    //   ...newTopicData,
    //   partitions.length: Number((event.target as HTMLInputElement).value),
    // });
  };
  const onBlur = () => {
    if (newTopicData.partitions.length < 1) {
      // onPartitionsChange({ ...newTopicData, partitions: 1 });
    }
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
            newTopicData.partitions.length >= availablePartitionLimit
              ? t("partitions_warning")
              : t("partition_helper_text")
          }
          validated={
            newTopicData.partitions.length >= availablePartitionLimit
              ? "warning"
              : "default"
          }
          isRequired
        >
          <NumberInput
            onPlus={handleOnPlus}
            onMinus={handleOnMinus}
            value={Number(newTopicData.partitions.length)}
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
