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
  customTimeValue: CustomSelect;
  setCustomTimeValue: (data: CustomSelect) => void;
  radioTimeSelectValue: RadioSelectType;
  setRadioTimeSelectValue: (value: RadioSelectType) => void;
  radioSizeSelectValue: RetentionSizeRadioSelect;
  setRadioSizeSelectValue: (data: RetentionSizeRadioSelect) => void;
};

export const StepMessageRetention: React.FC<StepMessageRetentionProps> = ({
  customTimeValue,
  setCustomTimeValue,
  radioTimeSelectValue,
  setRadioTimeSelectValue,
  setCustomRetentionSizeValue,
  customRetentionSizeValue,
  radioSizeSelectValue,
  setRadioSizeSelectValue,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const handleRetentionMessageSize = (value: RetentionSizeRadioSelect) => {
    if (value === "unlimited") {
      setRadioSizeSelectValue(value);
      setCustomRetentionSizeValue({ value: -1, unit: "unlimited" });
    } else {
      setCustomRetentionSizeValue({ value: 1, unit: "bytes" });
      setRadioSizeSelectValue(value);
    }
  };

  const retentionTime = (value: RadioSelectType) => {
    switch (value) {
      case "day":
        setCustomTimeValue({ value: 1, unit: "days" });
        break;
      case "week":
        setCustomTimeValue({ value: 1, unit: "weeks" });
        break;
      case "custom":
        setCustomTimeValue({ value: 7, unit: "days" });
        break;
      case "unlimited":
        setCustomTimeValue({ value: -1, unit: "unlimited" });
        break;
    }
    setRadioTimeSelectValue(value);
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
            isRequired
          >
            <Stack hasGutter>
              <Radio
                isChecked={radioTimeSelectValue === "day"}
                name="radioDay"
                onChange={() => retentionTime("day")}
                label="A day"
                aria-label="A day"
                id="radio-controlled-1"
                value={radioTimeSelectValue}
              />
              <Radio
                isChecked={radioTimeSelectValue === "week"}
                name="radioWeek"
                onChange={() => retentionTime("week")}
                label="A week"
                aria-label="A week"
                id="radio-controlled-2"
                value={radioTimeSelectValue}
              />
              <Radio
                isChecked={radioTimeSelectValue === "custom"}
                name="radioCustomTime"
                onChange={() => retentionTime("custom")}
                label="Custom duration"
                aria-label="custom input"
                id="radio-controlled-4"
                value={radioTimeSelectValue}
              />
              {radioTimeSelectValue === "custom" && (
                <CustomRetentionMessage
                  customTimeValue={customTimeValue}
                  setCustomTimeValue={setCustomTimeValue}
                />
              )}
              <Radio
                isChecked={radioTimeSelectValue === "unlimited"}
                name="radioUnlimitedTime"
                onChange={() => retentionTime("unlimited")}
                label="Unlimited time"
                aria-label="Unlimited"
                id="radio-controlled-3"
                value={radioTimeSelectValue}
              />
            </Stack>
          </FormGroup>
          <FormGroup
            fieldId="form-group-retention-size-in-wizard"
            label="Retention size"
          >
            <Stack hasGutter>
              <Radio
                isChecked={radioSizeSelectValue === "unlimited"}
                name="radioUnlimitedSize"
                onChange={() => handleRetentionMessageSize("unlimited")}
                label="Unlimited size"
                aria-label="Unlimited"
                id="radio-controlled-6"
                value={radioSizeSelectValue}
              />
              <Radio
                isChecked={radioSizeSelectValue === "custom"}
                name="radioCustomSize"
                onChange={() => handleRetentionMessageSize("custom")}
                label="Custom size"
                aria-label="custom size"
                id="radio-controlled-5"
                value={radioSizeSelectValue}
              />
              {radioSizeSelectValue === "custom" && (
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
