import type { SelectProps } from "@patternfly/react-core";
import { TextInput } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import type React from "react";
import { useState } from "react";
import type { CustomSelect, TimeUnit, RadioSelectType } from "./types";
import { retentionTimeSelectOptions } from "./types";

export type CustomRetentionMessageProps = {
  id?: string;
  customTimeValue: CustomSelect;
  setCustomTimeValue: (data: CustomSelect) => void;
  setRadioTimeSelectValue?: (value: RadioSelectType) => void;
};

const CustomRetentionMessage: React.FC<CustomRetentionMessageProps> = ({
  customTimeValue,
  setCustomTimeValue,
  setRadioTimeSelectValue,
}) => {
  const [isRetentionTimeSelectOpen, setIsRetentionTimeSelectOpen] =
    useState<boolean>(false);

  const onRetentionTimeToggle = (isOpen: boolean) => {
    setIsRetentionTimeSelectOpen(isOpen);
  };

  const onSelect: SelectProps["onSelect"] = (event, value) => {
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
    if (inputValue.value > -1) setCustomTimeValue(inputValue);
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
          <TextInput
            aria-label={"Retention time"}
            type="number"
            value={customTimeValue.value == 0 ? "" : customTimeValue.value}
            onChange={onChange}
            min={1}
          />
        </FlexItem>
      </Flex>
    </div>
  );
};

export { CustomRetentionMessage };
