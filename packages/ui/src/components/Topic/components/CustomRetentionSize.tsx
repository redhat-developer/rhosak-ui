import { SelectProps, TextInput } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import type React from "react";
import { CustomRetentionSizeSelect, CustomRetentionUnit, retentionSizeSelectOptions } from "./types";
import { useState } from 'react';


export type CustomRetentionSizeProps = {
  id?: string;
  customRetentionSizeValue: CustomRetentionSizeSelect;
  setCustomRetentionSizeValue: (data: CustomRetentionSizeSelect) => void
};

const CustomRetentionSize: React.FC<CustomRetentionSizeProps> = ({
  customRetentionSizeValue,
  setCustomRetentionSizeValue
}) => {

  const [isRetentionSizeSelectOpen, setIsRetentionSizeSelectOpen] =
    useState<boolean>(false);

  const onRetentionSizeToggle = (isOpen: boolean) => {
    setIsRetentionSizeSelectOpen(isOpen);
  };

  const onSelect: SelectProps["onSelect"] = (event, value) => {
    const inputUnit: CustomRetentionSizeSelect = {
      unit: value as CustomRetentionUnit,
      value: 0
    }
    setCustomRetentionSizeValue(inputUnit);
    onRetentionSizeToggle(false);
  };

  const onChange = (input: string) => {
    const inputValue: CustomRetentionSizeSelect = { ...customRetentionSizeValue, value: Number(input) };
    setCustomRetentionSizeValue(inputValue);
  };
  return (
    <div className="kafka-ui--radio__parameters">
      <Flex>
        <FlexItem>
          <TextInput
            type="number"
            value={customRetentionSizeValue.value}
            onChange={onChange}
          />
        </FlexItem>
        <FlexItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onRetentionSizeToggle}
            onSelect={(event, value) => onSelect(event, value as string)}
            selections={customRetentionSizeValue.unit}
            isOpen={isRetentionSizeSelectOpen}
          >
            {retentionSizeSelectOptions?.map((s) => (
              <SelectOption
                key={s.key}
                value={s.value}
                isPlaceholder={s.isPlaceholder}
              />
            ))}
          </Select>
        </FlexItem>
      </Flex>
    </div>
  );
};

export { CustomRetentionSize };
