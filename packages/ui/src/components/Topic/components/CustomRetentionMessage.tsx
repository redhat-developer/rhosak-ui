import { NumberInputProps, SelectProps, TextInput } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import type React from "react";
import { CustomSelect, TimeUnit, retentionTimeSelectOptions } from "./types";



export type CustomRetentionMessageProps = NumberInputProps &
  SelectProps & {
    id?: string;
    customValue: CustomSelect;
    setCustomValue: (data: CustomSelect) => void;
  };

const CustomRetentionMessage: React.FC<CustomRetentionMessageProps> = ({
  onToggle,
  isOpen,
  customValue,
  setCustomValue,
}) => {


  // const [unit, setUnit] = useState<"days" | "hours" | "minutes" | "seconds" | "ms">("days")
  const onSelect: SelectProps["onSelect"] = (event, value) => {
    const inputUnit: CustomSelect = { unit: value as TimeUnit, value: undefined }
    setCustomValue(inputUnit);
    onToggle(false, event);
  };


  // const handleTouchSpin = (operator: string) => {
  //   if (operator === "+") {
  //     const inputUnit: CustomSelect = { ...customValue, value: customValue.value + 1 }
  //     setCustomValue(inputUnit);
  //   } else if (operator === "-") {
  //     const inputUnit: CustomSelect = { ...customValue, value: customValue.value - 1 }
  //     setCustomValue(inputUnit);
  //   }
  // }



  // const onChangeTouchSpin = (event: React.FormEvent<HTMLInputElement>) => {
  //   const inputUnit: CustomSelect = { ...customValue, value: BigInt(event.currentTarget.value) }
  //   setCustomValue(inputUnit)
  // };

  const onChange = (input: string) => {
    const inputValue: CustomSelect = { ...customValue, value: Number(input) }
    setCustomValue(inputValue)
  }


  return (
    <div className="kafka-ui--radio__parameters">
      <Flex>
        <FlexItem>
          <TextInput type="number" value={customValue.value} onChange={onChange} />
        </FlexItem>
        <FlexItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onToggle}
            onSelect={(event, value) => onSelect(event, value as string)}
            placeholder='days'
            selections={customValue.unit}
            isOpen={isOpen}
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
