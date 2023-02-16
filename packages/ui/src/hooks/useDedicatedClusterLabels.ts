import { useTranslation } from "react-i18next";
import type { DedicatedClusterField } from "ui-models/src/models/dedicated-cluster";

export function useDedicatedClusterLabels() {
  const { t } = useTranslation("cluster");

  const fields: {
    [field in DedicatedClusterField]: string;
  } = {
    id: t("fields.id"),
    status: t("fields.status"),
  };
  return {
    fields,
  };
}
