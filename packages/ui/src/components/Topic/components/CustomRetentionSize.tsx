import type { NumberInputProps, SelectProps } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  NumberInput,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import type React from "react";
import type { Topic } from "ui-models/src/models/topic";
import { RetentionSizeUnits } from "../../KafkaTopics/types";
import type { SelectOptions } from "./types";
import { Bytes } from "ui-models/src/types";

export type CustomRetentionSizeProps = NumberInputProps &
  SelectProps & {
    id?: string;
    selectOptions: SelectOptions[];
    topicData: Topic;
    setTopicData: (data: Topic) => void;
  };

const CustomRetentionSize: React.FC<CustomRetentionSizeProps> = ({
  onToggle,
  isOpen,
  selectOptions,
  topicData,
  setTopicData,
}) => {
  const onSelect: SelectProps["onSelect"] = (event, value) => {
    setTopicData({
      ...topicData,
      "retention.ms": { type: "ms", value: BigInt(1) },
    });

    //}

    onToggle(false, event);
  };

  const handleTouchSpin = (operator: string) => {
    if (operator === "+") {
      const currentValue = topicData["retention.bytes"].value;
      const newValue: Bytes = {
        type: "bytes",
        value: currentValue + BigInt(1),
      };

      setTopicData({
        ...topicData,
        "retention.bytes": newValue,
      });
    } else if (operator === "-") {
      const currentValue = topicData["retention.bytes"].value;
      const newValue: Bytes = {
        type: "bytes",
        value: currentValue - BigInt(1),
      };
      setTopicData({
        ...topicData,
        "retention.bytes": newValue,
      });
    }
  };

  const onChangeTouchSpin = (event: React.FormEvent<HTMLInputElement>) => {
    setTopicData({
      ...topicData,
      "retention.bytes": {
        type: "bytes",
        value: BigInt(event.currentTarget.value),
      },
    });
  };

  return (
    <div className="kafka-ui--radio__parameters">
      <Flex>
        <FlexItem>
          <NumberInput
            onMinus={() => handleTouchSpin("-")}
            onPlus={() => handleTouchSpin("+")}
            value={
              Number(
                topicData["retention.bytes"].value
              ) /* TODO precision loss from BigInt to Number */
            }
            onChange={(event) => onChangeTouchSpin(event)}
            min={0}
          />
        </FlexItem>
        <FlexItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onToggle}
            onSelect={onSelect}
            selections={RetentionSizeUnits.BYTE /* TODO */}
            isOpen={isOpen}
          >
            {selectOptions?.map((s) => (
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
