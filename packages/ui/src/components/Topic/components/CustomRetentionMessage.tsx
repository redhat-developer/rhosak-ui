import type { SelectProps } from "@patternfly/react-core";
import { FormGroup } from "@patternfly/react-core";
import { TextInput } from "@patternfly/react-core";
import {
  Flex,
  ValidatedOptions,
  FlexItem,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import type React from "react";
import { useState } from "react";
import type { CustomSelect, TimeUnit, RadioSelectType } from "./types";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { retentionTimeSelectOptions } from "./types";

export type CustomRetentionMessageProps = {
  id?: string;
  customTimeValue: CustomSelect;
  setCustomTimeValue: (data: CustomSelect) => void;
  setRadioTimeSelectValue?: (value: RadioSelectType) => void;
  retentionTimeValidated: ValidatedOptions;
  onChangeRetentionTimeValidated: (value: ValidatedOptions) => void;
};

const CustomRetentionMessage: React.FC<CustomRetentionMessageProps> = ({
  customTimeValue,
  setCustomTimeValue,
  setRadioTimeSelectValue,
  retentionTimeValidated,
  onChangeRetentionTimeValidated,
}) => {
  const { t } = useTranslation(["create-topic"]);
  const [isRetentionTimeSelectOpen, setIsRetentionTimeSelectOpen] =
    useState<boolean>(false);

  const onRetentionTimeToggle = (isOpen: boolean) => {
    setIsRetentionTimeSelectOpen(isOpen);
  };

  const onSelect: SelectProps["onSelect"] = (event, value) => {
    onChangeRetentionTimeValidated(ValidatedOptions.default);
    const inputUnit: CustomSelect = {
      unit: value as TimeUnit,
      value: 1,
    };
    setCustomTimeValue(inputUnit);
    onRetentionTimeToggle(false);
  };

  const onChange = (input: string) => {
    const inputValue: CustomSelect = {
      ...customTimeValue,
      value: Number(input),
    };
    if (inputValue.value > -1) {
      onChangeRetentionTimeValidated(ValidatedOptions.default);
      setCustomTimeValue(inputValue);
    }
    setRadioTimeSelectValue && setRadioTimeSelectValue("custom");
  };

  return (
    <div className="kafka-ui--radio__parameters">
      <Flex>
        <FlexItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onRetentionTimeToggle}
            onSelect={(event, value) => onSelect(event, value as string)}
            placeholder="days"
            selections={customTimeValue.unit}
            isOpen={isRetentionTimeSelectOpen}
          >
            {retentionTimeSelectOptions?.map((s) => (
              <SelectOption
                key={s.key}
                value={s.value}
                isPlaceholder={s.isPlaceholder}
              >
                {s.value}
              </SelectOption>
            ))}
          </Select>
        </FlexItem>
        <FlexItem>
          <FormGroup
            helperTextInvalid={t("common:required")}
            validated={retentionTimeValidated}
          >
            <TextInput
              aria-label={"Retention time"}
              type="number"
              value={customTimeValue.value == 0 ? "" : customTimeValue.value}
              onChange={onChange}
              min={1}
              validated={retentionTimeValidated}
            />
          </FormGroup>
        </FlexItem>
      </Flex>
    </div>
  );
};

export { CustomRetentionMessage };
