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

export type StepPartitionsProps = {
  partitions: number;
  onPartitionsChange: (value: number) => void;
  availablePartitionLimit: number;
};

export const StepPartitions: React.FC<StepPartitionsProps> = ({
  partitions,
  onPartitionsChange,
  availablePartitionLimit,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const handleOnPlus = () => {
    onPartitionsChange(partitions + 1);
  };

  const handleOnMinus = () => {
    onPartitionsChange(partitions - 1);
  };

  const handlePartitionTouchspinChange: NumberInputProps["onChange"] = (
    event
  ) => {
    const newPartitionCount = Number((event.target as HTMLInputElement).value);
    if (newPartitionCount > -1) onPartitionsChange(newPartitionCount);
  };

  const onBlur = () => {
    if (partitions < 1) onPartitionsChange(1);
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
            partitions >= availablePartitionLimit
              ? t("partitions_warning")
              : t("partition_helper_text")
          }
          validated={
            partitions >= availablePartitionLimit ? "warning" : "default"
          }
          isRequired
        >
          <NumberInput
            onPlus={handleOnPlus}
            onMinus={handleOnMinus}
            value={partitions == 0 ? "" : partitions}
            inputName="input"
            onChange={handlePartitionTouchspinChange}
            widthChars={20}
            min={1}
            onBlur={onBlur}
          />
        </FormGroup>
      </FormSection>
    </Form>
  );
};
