import type { SelectProps } from "@patternfly/react-core";
import { SelectGroup } from "@patternfly/react-core";
import {
  Select,
  SelectOption,
  SelectVariant,
  ToolbarItem,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { BrokerValue } from "../types";

type FilterByBrokerProps = {
  selectedBroker: BrokerValue | undefined;
  onSetSelectedBroker: (value: BrokerValue | undefined) => void;
  disableToolbar: boolean;
};

export const FilterByBroker: VoidFunctionComponent<FilterByBrokerProps> = ({
  selectedBroker,
  onSetSelectedBroker,
  disableToolbar,
}) => {
  const { t } = useTranslation("metrics");

  const [isBrokerSelectOpen, setIsBrokerSelectOpen] = useState<boolean>(false);

  const onBrokerToggle = (isBrokerSelectOpen: boolean) => {
    setIsBrokerSelectOpen(isBrokerSelectOpen);
  };

  const brokerValueOption: { [key in BrokerValue]: string } = {
    "0": t("brokerList.broker0"),
    "1": t("brokerList.broker1"),
    "2": t("brokerList.broker2"),
    "3": t("brokerList.broker3"),
    "4": t("brokerList.broker4"),
    "5": t("brokerList.broker5"),
  };

  const onBrokerSelect: SelectProps["onSelect"] = (_, broker) => {
    broker !== t("all_brokers")
      ? onSetSelectedBroker(broker as BrokerValue)
      : onSetSelectedBroker(undefined);
    setIsBrokerSelectOpen(false);
  };

  const brokerOptions = () => [
    <SelectOption key={"broker-filter-0"} value={t("all_brokers")} />,
    <SelectGroup label="Filter by broker" key="broker-filter-group">
      {Object.entries(brokerValueOption).map(([value, label]) => (
        <SelectOption key={value} value={value}>
          {label}
        </SelectOption>
      ))}
    </SelectGroup>,
  ];

  const isDisabled = disableToolbar;

  return (
    <ToolbarItem>
      <Select
        variant={SelectVariant.single}
        isOpen={isBrokerSelectOpen}
        onToggle={onBrokerToggle}
        onSelect={onBrokerSelect}
        selections={selectedBroker || t("all_brokers")}
        position="left"
        placeholderText={t("all_brokers")}
        aria-label={t("filter-by-broker")}
        isDisabled={isDisabled}
      >
        {brokerOptions()}
      </Select>
    </ToolbarItem>
  );
};
