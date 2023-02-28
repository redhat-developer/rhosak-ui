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
import type { CustomSelect, TimeUnit } from "./types";
import { retentionTimeSelectOptions } from "./types";

export type CustomRetentionMessageProps = {
  id?: string;
  customValue: CustomSelect;
  setCustomValue: (data: CustomSelect) => void;
};

const CustomRetentionMessage: React.FC<CustomRetentionMessageProps> = ({
  customValue,
  setCustomValue,
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
    setCustomValue(inputUnit);

    onRetentionTimeToggle(false);
  };

  const onChange = (input: string) => {
    const inputValue: CustomSelect = { ...customValue, value: Number(input) };
    setCustomValue(inputValue);
  };

  return (
    <div className="kafka-ui--radio__parameters">
      <Flex>
        <FlexItem>
          <TextInput
            type="number"
            value={customValue.value == null ? "" : customValue.value}
            onChange={onChange}
            min={1}
          />
        </FlexItem>
        <FlexItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onRetentionTimeToggle}
            onSelect={(event, value) => onSelect(event, value as string)}
            placeholder="days"
            selections={customValue.unit}
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
      </Flex>
    </div>
  );
};

export { CustomRetentionMessage };
