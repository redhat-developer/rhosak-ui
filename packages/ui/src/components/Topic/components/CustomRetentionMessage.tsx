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
import { RetentionTimeUnits } from "../../KafkaTopics/types";
import type { SelectOptions } from "./types";
import { Bytes, Milliseconds } from "ui-models/src/types";

export type CustomRetentionMessageProps = NumberInputProps &
  SelectProps & {
    id?: string;
    selectOptions: SelectOptions[];
    topicData: Topic;
    setTopicData: (data: Topic) => void;
  };

const CustomRetentionMessage: React.FC<CustomRetentionMessageProps> = ({
  onToggle,
  isOpen,
  selectOptions,
  topicData,
  setTopicData,
}) => {
  const onSelect: SelectProps["onSelect"] = (event, value) => {
    // setTopicData({
    //   ...topicData,
    //   customRetentionTimeUnit: value as RetentionTimeUnits,
    // });

    //}

    onToggle(false, event);
  };

  const handleTouchSpin = (operator: string) => {
    if (operator === "+") {
      const cuurentTime = topicData["retention.ms"].value;
      const newTime: Milliseconds = {
        type: "ms",
        value: cuurentTime + BigInt(1),
      };
      setTopicData({
        ...topicData,
        "retention.ms": newTime,
      });
    } else if (operator === "-") {
      const cuurentTime = topicData["retention.ms"].value;
      const newTime: Milliseconds = {
        type: "ms",
        value: cuurentTime - BigInt(1),
      };
      setTopicData({
        ...topicData,
        "retention.ms": newTime,
      });
    }
  };

  const onChangeTouchSpin = (event: React.FormEvent<HTMLInputElement>) => {
    setTopicData({
      ...topicData,
      "retention.ms": { type: "ms", value: BigInt(event.currentTarget.value) },
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
                topicData["retention.ms"].value
              ) /* TODO precision loss from BigInt to Number, handle this as a string */
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
            selections={RetentionTimeUnits.MILLISECOND /* TODO */}
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

export { CustomRetentionMessage };
