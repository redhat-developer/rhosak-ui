import type { SelectProps } from "@patternfly/react-core";
import { FormGroup } from "@patternfly/react-core";
import { TextInput } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  ValidatedOptions,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import type React from "react";
import type {
  CustomRetentionSizeSelect,
  CustomRetentionUnit,
  RetentionSizeRadioSelect,
} from "./types";
import { retentionSizeSelectOptions } from "./types";
import { useTranslation } from "@rhoas/app-services-ui-components";

import { useState } from "react";

export type CustomRetentionSizeProps = {
  id?: string;
  customRetentionSizeValue: CustomRetentionSizeSelect;
  setCustomRetentionSizeValue: (data: CustomRetentionSizeSelect) => void;
  setRadioSizeSelectValue?: (value: RetentionSizeRadioSelect) => void;
  retentionSizeValidated: ValidatedOptions;
  onChangeRetentionSizeValidated: (value: ValidatedOptions) => void;
};

const CustomRetentionSize: React.FC<CustomRetentionSizeProps> = ({
  customRetentionSizeValue,
  setCustomRetentionSizeValue,
  setRadioSizeSelectValue,
  retentionSizeValidated,
  onChangeRetentionSizeValidated,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const [isRetentionSizeSelectOpen, setIsRetentionSizeSelectOpen] =
    useState<boolean>(false);

  const onRetentionSizeToggle = (isOpen: boolean) => {
    setIsRetentionSizeSelectOpen(isOpen);
  };

  const onSelect: SelectProps["onSelect"] = (event, value) => {
    onChangeRetentionSizeValidated(ValidatedOptions.default);
    const inputUnit: CustomRetentionSizeSelect = {
      unit: value as CustomRetentionUnit,
      value: 1,
    };
    setCustomRetentionSizeValue(inputUnit);
    onRetentionSizeToggle(false);
  };

  const onChange = (input: string) => {
    const inputValue: CustomRetentionSizeSelect = {
      ...customRetentionSizeValue,
      value: Number(input),
    };
    if (inputValue.value > -1) {
      setCustomRetentionSizeValue(inputValue);
      onChangeRetentionSizeValidated(ValidatedOptions.default);
    }
    setRadioSizeSelectValue && setRadioSizeSelectValue("custom");
  };

  return (
    <div className="kafka-ui--radio__parameters">
      <Flex>
        <FlexItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onRetentionSizeToggle}
            onSelect={onSelect}
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
        <FlexItem>
          <FormGroup
            validated={retentionSizeValidated}
            helperTextInvalid={t("common:required")}
          >
            <TextInput
              aria-label="Retention size"
              type="number"
              value={
                customRetentionSizeValue.value == 0
                  ? ""
                  : customRetentionSizeValue.value == -1
                  ? 1
                  : customRetentionSizeValue.value
              }
              onChange={onChange}
              validated={retentionSizeValidated}
              min={1}
            />
          </FormGroup>
        </FlexItem>
      </Flex>
    </div>
  );
};

export { CustomRetentionSize };
