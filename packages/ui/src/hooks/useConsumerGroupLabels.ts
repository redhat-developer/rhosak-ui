import { useTranslation } from "react-i18next";
import type { ConsumerGroupField } from "ui-models/src/models/consumer-group";

export function useConsumerGroupLabels() {
  const { t } = useTranslation("kafka");

  const fields: {
    [field in ConsumerGroupField]: string;
  } = {
    name: t("consumerGroup.consumer_group_id"),
    activeConsumers: t("consumerGroup.active_members"),
    laggingPartitions: t("consumerGroup.partitions_with_lag"),
    state: t("consumerGroup.state_header"),
  };
  return {
    fields,
  };
}
