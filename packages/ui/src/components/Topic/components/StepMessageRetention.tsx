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
import type { Topic } from "ui-models/src/models/topic";
import { RetentionSizeUnits } from "../../KafkaTopics/types";
import { CustomRetentionMessage } from "./CustomRetentionMessage";
import { CustomRetentionSize } from "./CustomRetentionSize";
import type {
  CustomRetentionSizeSelect,
  CustomSelect,
  RadioSelectType,
  RetentionSizeRadioSelect,
} from "./types";

export type StepMessageRetentionProps = {
  customRetentionSizeValue: CustomRetentionSizeSelect;
  setCustomRetentionSizeValue: (data: CustomRetentionSizeSelect) => void;
  customValue: CustomSelect;
  setCustomValue: (data: CustomSelect) => void;
  radioSelectValue: RadioSelectType;
  setRadioSelectValue: (value: RadioSelectType) => void;
  customRetentionRadioSelect: RetentionSizeRadioSelect;
  setCustomRetentionRadioSelect: (data: RetentionSizeRadioSelect) => void;
};

export const StepMessageRetention: React.FC<StepMessageRetentionProps> = ({
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

  const handleRetentionMessageSize = (value: RetentionSizeRadioSelect) => {
    if (value === "unlimited") {
      setCustomRetentionSizeValue({ value: -1, unit: "unlimited" });
    } else {
      setCustomRetentionSizeValue({ value: 1, unit: "bytes" });
    }
    setCustomRetentionRadioSelect(value)
  };

  const retentionTime = (value: RadioSelectType) => {
    switch (value) {
      case "day":
        setCustomValue({ value: 1, unit: "days" });
        break;
      case "week":
        setCustomValue({ value: 1, unit: "weeks" });
        break;
      case "custom":
        setCustomValue({ value: 7, unit: "days" });
        break;
      case "unlimited":
        setCustomValue({ value: -1, unit: "unlimited" });
        break;
    }
    setRadioSelectValue(value)
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
                isChecked={radioSelectValue === "day"}
                name="radioDay"
                onChange={() => retentionTime("day")}
                label="A day"
                aria-label="A day"
                id="radio-controlled-1"
                value={radioSelectValue}
              />
              <Radio
                isChecked={radioSelectValue === "week"}
                name="radioWeek"
                onChange={() => retentionTime("week")}
                label="A week"
                aria-label="A week"
                id="radio-controlled-2"
                value={radioSelectValue}
              />
              <Radio
                isChecked={radioSelectValue === "custom"}
                name="radioCustomTime"
                onChange={() => retentionTime("custom")}
                label="Custom duration"
                aria-label="custom input"
                id="radio-controlled-4"
                value={radioSelectValue}
              />
              {radioSelectValue === "custom" && (
                <CustomRetentionMessage
                  customValue={customValue}
                  setCustomValue={setCustomValue}
                />
              )}
              <Radio
                isChecked={radioSelectValue === "unlimited"}
                name="radioUnlimitedTime"
                onChange={() => retentionTime("unlimited")}
                label="Unlimited time"
                aria-label="Unlimited"
                id="radio-controlled-3"
                value={radioSelectValue}
              />
            </Stack>
          </FormGroup>
          <FormGroup
            fieldId="form-group-retention-size-in-wizard"
            label="Retention size"
          >
            <Stack hasGutter>
              <Radio
                isChecked={customRetentionRadioSelect === "unlimited"}
                name="radioUnlimitedSize"
                onChange={() => handleRetentionMessageSize("unlimited")}
                label="Unlimited size"
                aria-label="Unlimited"
                id="radio-controlled-6"
                value={customRetentionRadioSelect}
              />
              <Radio
                isChecked={customRetentionRadioSelect === "custom"}
                name="radioCustomSize"
                onChange={() => handleRetentionMessageSize("custom")}
                label="Custom size"
                aria-label="custom size"
                id="radio-controlled-5"
                value={customRetentionRadioSelect}
              />
              {customRetentionRadioSelect === "custom" && (
                <CustomRetentionSize
                  customRetentionSizeValue={customRetentionSizeValue}
                  setCustomRetentionSizeValue={setCustomRetentionSizeValue}
                />
              )}
            </Stack>
          </FormGroup>
        </FormSection>
      </Form>
    </>
  );
};
