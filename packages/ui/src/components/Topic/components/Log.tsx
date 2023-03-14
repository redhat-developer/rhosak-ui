import {
  FormSection,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import {
  DropdownWithToggle,
  FormGroupWithPopover,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import convert from "convert";
import type React from "react";
import type { Topic } from "ui-models/src/models/topic";
import { TextWithLabelPopover } from "./TextWithLabelPopover";
import type { IDropdownOption } from "./types";
import type { CleanupPolicy } from "ui-models/src/types";

export type LogProps = {
  topicData: Topic;
  defaultDeleteRetentionTime: bigint;
  defaultMinCleanbleRatio: number;
  defaultMinimumCompactionLagTime: bigint;
  cleanupPolicy: CleanupPolicy;
  setCleanupPolicy: (value: CleanupPolicy) => void;
};

const Log: React.FC<LogProps> = ({
  topicData,
  defaultDeleteRetentionTime,
  defaultMinCleanbleRatio,
  defaultMinimumCompactionLagTime,
  cleanupPolicy,
  setCleanupPolicy,
}) => {
  const { t } = useTranslation(["create-topic", "common"]);

  const cleanupPolicyOptions: IDropdownOption[] = [
    {
      key: "compact",
      value: "compact",
      label: t("compact"),
      isDisabled: false,
    },
    {
      key: "delete",
      value: "delete",
      label: t("common:delete"),
      isDisabled: false,
    },
    {
      key: "delete, compact",
      value: "compact,delete",
      label: `${t("compact")},${t("common:delete")}`,
      isDisabled: false,
    },
  ];

  const onSelectOption = (value: string) => {
    setCleanupPolicy(value as CleanupPolicy);
  };

  return (
    <FormSection title={t("log")} id="log" titleElement={"h2"}>
      <TextContent>
        <Text component={TextVariants.p}>{t("log_section_info")}</Text>
        <Text component={TextVariants.small}>{t("log_section_info_note")}</Text>
      </TextContent>

      <FormGroupWithPopover
        fieldId="cleanup-policy"
        fieldLabel={t("cleanup_policy")}
        labelHead={t("cleanup_policy")}
        labelBody={t("cleanup_policy_description")}
        buttonAriaLabel={t("cleanup_policy")}
      >
        <DropdownWithToggle
          id="log-section-policy-type-dropdown"
          toggleId="log-section-policy-type-dropdowntoggle"
          ariaLabel={t("select_policy")}
          onSelectOption={onSelectOption}
          items={cleanupPolicyOptions}
          name="cleanup-policy"
          value={cleanupPolicy}
          isLabelAndValueNotSame={true}
          key={topicData["cleanup.policy"]}
        />
      </FormGroupWithPopover>

      <TextWithLabelPopover
        fieldId="delete-retention-time"
        btnAriaLabel={t("delete_retention_time")}
        fieldLabel={t("delete_retention_time")}
        fieldValue={t("milliseconds_time_to_day", {
          value: defaultDeleteRetentionTime,
          days: convert(Number(defaultDeleteRetentionTime), "milliseconds").to(
            "days"
          ),
        })}
        popoverBody={t("delete_retention_time_description")}
        popoverHeader={t("delete_retention_time")}
      />

      <TextWithLabelPopover
        fieldId="min-cleanable-ratio"
        btnAriaLabel={t("min_cleanable_ratio")}
        fieldLabel={t("min_cleanable_ratio")}
        fieldValue={String(defaultMinCleanbleRatio)}
        popoverBody={t("min_cleanable_ratio_description")}
        popoverHeader={t("min_cleanable_ratio")}
      />

      <TextWithLabelPopover
        fieldId="min-compaction-lag-time-description"
        btnAriaLabel={t("min_compaction_lag_time")}
        fieldLabel={t("min_compaction_lag_time")}
        fieldValue={t("milliseconds_time", {
          value: defaultMinimumCompactionLagTime,
        })}
        popoverBody={t("min_compaction_lag_time_description")}
        popoverHeader={t("min_compaction_lag_time")}
      />
    </FormSection>
  );
};

export { Log };
