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
import type { TopicPartition } from "ui-models/src/models/topic-partition";

export type StepPartitionsProps = {
  partitions: TopicPartition[];
  onPartitionsChange: (value: TopicPartition[]) => void;
  availablePartitionLimit: number;
};

export const StepPartitions: React.FC<StepPartitionsProps> = ({
  partitions,
  onPartitionsChange,
  availablePartitionLimit,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const handleOnPlus = () => {
    const newPartitions = [...partitions, { partition: partitions.length }];
    onPartitionsChange(newPartitions);
  };

  const handleOnMinus = () => {
    const newPartitions = partitions.slice(0, partitions.length - 1);
    onPartitionsChange(newPartitions);
  };

  const handlePartitionTouchspinChange: NumberInputProps["onChange"] = (
    event
  ) => {
    const newPartitionCount = Number((event.target as HTMLInputElement).value);
    const newPartitions = Array.from(
      { length: newPartitionCount },
      (_, i) => partitions[i] ?? { partition: i }
    );
    onPartitionsChange(newPartitions);
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
            partitions.length >= availablePartitionLimit
              ? t("partitions_warning")
              : t("partition_helper_text")
          }
          validated={
            partitions.length >= availablePartitionLimit ? "warning" : "default"
          }
          isRequired
        >
          <NumberInput
            onPlus={handleOnPlus}
            onMinus={handleOnMinus}
            value={
              Number(partitions.length) == 0 ? "" : Number(partitions.length)
            }
            inputName="input"
            onChange={handlePartitionTouchspinChange}
            widthChars={20}
            min={1}
          />
        </FormGroup>
      </FormSection>
    </Form>
  );
};
