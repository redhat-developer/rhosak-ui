import type { NumberInputProps, SelectProps } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  NumberInput,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import type { RetentionTimeUnits } from "@rhoas/app-services-ui-components";
import type React from "react";
import type { Topic } from "ui-models/src/models/topic";
import type { SelectOptions } from "../types";

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
    setTopicData({
      ...topicData,
      customRetentionTimeUnit: value as RetentionTimeUnits,
    });

    //}

    onToggle(false, event);
  };

  const handleTouchSpin = (operator: string) => {
    if (operator === "+") {
      setTopicData({
        ...topicData,
        retentionTime: topicData.retentionTime + 1,
      });
    } else if (operator === "-") {
      setTopicData({
        ...topicData,
        retentionTime: topicData.retentionTime - 1,
      });
    }
  };

  const onChangeTouchSpin = (event: React.FormEvent<HTMLInputElement>) => {
    setTopicData({
      ...topicData,
      retentionTime: Number(event.currentTarget.value),
    });
  };

  return (
    <div className="kafka-ui--radio__parameters">
      <Flex>
        <FlexItem>
          <NumberInput
            onMinus={() => handleTouchSpin("-")}
            onPlus={() => handleTouchSpin("+")}
            value={topicData.retentionTime}
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
            selections={topicData.customRetentionTimeUnit}
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
