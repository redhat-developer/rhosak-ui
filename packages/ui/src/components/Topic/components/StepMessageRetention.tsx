import {
  Form,
  FormGroup,
  FormSection,
  Radio,
  Stack,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type React from "react";
import { useState } from "react";
import type { Topic } from "ui-models/src/models/topic";
import {
  RetentionSizeUnits,
  RetentionTimeUnits,
} from "../../KafkaTopics/types";
import { CustomRetentionMessage } from "./CustomRetentionMessage";
import { CustomRetentionSize } from "./CustomRetentionSize";
import {
  retentionSizeSelectOptions,
  retentionTimeSelectOptions,
} from "./types";

export type StepMessageRetentionProps = {
  newTopicData: Topic;
  onChangeMessageRetention: (topic: Topic) => void;
};

export const StepMessageRetention: React.FC<StepMessageRetentionProps> = ({
  newTopicData,
  onChangeMessageRetention,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const [isRetentionTimeSelectOpen, setIsRetentionTimeSelectOpen] =
    useState<boolean>(false);
  const [isRetentionSizeSelectOpen, setIsRetentionSizeSelectOpen] =
    useState<boolean>(false);

  const handleRetentionMessageTime = (value: RetentionTimeUnits) => {
    switch (value) {
      case RetentionTimeUnits.DAY:
        onChangeMessageRetention({
          ...newTopicData,
          "retention.ms": { type: "ms", value: BigInt(86400000) },
        });
        break;

      case RetentionTimeUnits.HOUR:
        onChangeMessageRetention({
          ...newTopicData,
          "retention.ms": { type: "ms", value: BigInt(3600000) },
        });
        break;
      case RetentionTimeUnits.MILLISECOND:
        onChangeMessageRetention({
          ...newTopicData,
          "retention.ms": { type: "ms", value: BigInt(1) },
        });
        break;
      case RetentionTimeUnits.MINUTE:
        onChangeMessageRetention({
          ...newTopicData,
          "retention.ms": { type: "ms", value: BigInt(6000) },
        });
        break;
      case RetentionTimeUnits.SECOND:
        onChangeMessageRetention({
          ...newTopicData,
          "retention.ms": { type: "ms", value: BigInt(1000) },
        });
        break;
      case RetentionTimeUnits.WEEK:
        onChangeMessageRetention({
          ...newTopicData,
          "retention.ms": { type: "ms", value: BigInt(604800000) },
        });
        break;
      case RetentionTimeUnits.UNLIMITED:
        onChangeMessageRetention({
          ...newTopicData,
          "retention.ms": { type: "ms", value: BigInt(-1) },
        });
        break;
      case RetentionTimeUnits.CUSTOM:
        onChangeMessageRetention({
          ...newTopicData,
          "retention.ms": { type: "ms", value: BigInt(604800000) },
        });
        break;
    }
  };

  const handleRetentionMessageSize = (value: RetentionSizeUnits) => {
    if (value == RetentionSizeUnits.CUSTOM) {
      onChangeMessageRetention({
        ...newTopicData,
        "retention.ms": { type: "ms", value: BigInt(1) },
      });
    } else {
      onChangeMessageRetention({
        ...newTopicData,
        "retention.ms": { type: "ms", value: BigInt(1) },
      });
    }
  };

  const onRetentionTimeToggle = (isOpen: boolean) => {
    setIsRetentionTimeSelectOpen(isOpen);
  };

  const onRetentionSizeToggle = (isOpen: boolean) => {
    setIsRetentionSizeSelectOpen(isOpen);
  };

  return (
    <>
      <Form onSubmit={(event) => event.preventDefault()}>
        <FormSection
          title={t("message_retention")}
          id="message-retention"
          titleElement={"h2"}
        >
          <TextContent>
            <Text component={TextVariants.p}>
              {t("message_retention_info")}
            </Text>
            <Text component={TextVariants.small}>
              {t("message_retention_info_note")}
            </Text>
          </TextContent>

          <FormGroup
            fieldId="form-group-retention-time-in-wizard"
            label={t("retention_time")}
          >
            <Stack hasGutter>
              <Radio
                isChecked={
                  newTopicData["retention.ms"].value === BigInt(86400000)
                }
                name="radioDay"
                onChange={() =>
                  handleRetentionMessageTime(RetentionTimeUnits.DAY)
                }
                label="A day"
                aria-label="A day"
                id="radio-controlled-1"
                value={RetentionTimeUnits.DAY}
              />
              <Radio
                isChecked={
                  newTopicData["retention.ms"].value === BigInt(604800000)
                }
                name="radioWeek"
                onChange={() =>
                  handleRetentionMessageTime(RetentionTimeUnits.WEEK)
                }
                label="A week"
                aria-label="A week"
                id="radio-controlled-2"
                value={RetentionTimeUnits.WEEK}
              />
              <Radio
                isChecked={
                  newTopicData["retention.ms"].value === BigInt(604800000)
                }
                name="radioCustomTime"
                onChange={() =>
                  handleRetentionMessageTime(RetentionTimeUnits.CUSTOM)
                }
                label="Custom duration"
                aria-label="custom input"
                id="radio-controlled-4"
                value={RetentionTimeUnits.CUSTOM}
              />
              {newTopicData["retention.ms"].value === BigInt(604800000) && (
                <CustomRetentionMessage
                  name="retention-ms"
                  topicData={newTopicData}
                  setTopicData={onChangeMessageRetention}
                  onToggle={onRetentionTimeToggle}
                  isOpen={isRetentionTimeSelectOpen}
                  selectOptions={retentionTimeSelectOptions}
                />
              )}
              <Radio
                isChecked={newTopicData["retention.ms"].value === BigInt(-1)}
                name="radioUnlimitedTime"
                onChange={() =>
                  handleRetentionMessageTime(RetentionTimeUnits.UNLIMITED)
                }
                label="Unlimited time"
                aria-label="Unlimited"
                id="radio-controlled-3"
                value={RetentionTimeUnits.UNLIMITED}
              />
            </Stack>
          </FormGroup>
          <FormGroup
            fieldId="form-group-retention-size-in-wizard"
            label="Retention size"
          >
            <Stack hasGutter>
              <Radio
                isChecked={newTopicData["retention.ms"].value === BigInt(-1)}
                name="radioUnlimitedSize"
                onChange={() =>
                  handleRetentionMessageSize(RetentionSizeUnits.UNLIMITED)
                }
                label="Unlimited size"
                aria-label="Unlimited"
                id="radio-controlled-6"
                value={RetentionSizeUnits.UNLIMITED}
              />
              <Radio
                isChecked={
                  // newTopicData['retention.ms'].type === RetentionSizeUnits.CUSTOM
                  false
                }
                name="radioCustomSize"
                onChange={() =>
                  handleRetentionMessageSize(RetentionSizeUnits.CUSTOM)
                }
                label="Custom size"
                aria-label="custom size"
                id="radio-controlled-5"
                value={RetentionSizeUnits.CUSTOM}
              />
              {
                // newTopicData['retention.ms'].type ===
                // RetentionSizeUnits.CUSTOM &&
                false && (
                  <CustomRetentionSize
                    name="retention-bytes"
                    topicData={newTopicData}
                    setTopicData={onChangeMessageRetention}
                    onToggle={onRetentionSizeToggle}
                    isOpen={isRetentionSizeSelectOpen}
                    selectOptions={retentionSizeSelectOptions}
                  />
                )
              }
            </Stack>
          </FormGroup>
        </FormSection>
      </Form>
    </>
  );
};
