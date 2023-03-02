import { useTranslation } from "react-i18next";
import type {
  CloudProvider,
  KafkaField,
  SimplifiedStatus,
  Status,
} from "ui-models/src/models/kafka";

export function useKafkaLabels() {
  const { t } = useTranslation("kafka");

  const statuses: { [status in Status]: string } = {
    ready: t("statuses.ready"),
    degraded: t("statuses.degraded"),
    accepted: t("statuses.accepted"),
    provisioning: t("statuses.provisioning"),
    preparing: t("statuses.preparing"),
    deprovision: t("statuses.deprovision"),
    deleting: t("statuses.deleting"),
    suspended: t("statuses.suspended"),
    suspending: t("statuses.suspending"),
    resuming: t("statuses.resuming"),
  };
  const statusesSimplified: { [status in SimplifiedStatus]: string } = {
    creating: t("statusesSimplified.creating"),
    ready: t("statusesSimplified.ready"),
    degraded: t("statusesSimplified.degraded"),
    deleting: t("statusesSimplified.deleting"),
    suspended: t("statusesSimplified.suspended"),
    suspending: t("statusesSimplified.suspending"),
    resuming: t("statusesSimplified.resuming"),
  };
  const providers: { [provider in CloudProvider]: string } = {
    aws: t("common:cloudProviders.aws"),
    gcp: t("common:cloudProviders.gcp"),
    azure: t("common:cloudProviders.azure"),
  };
  const providerRegions: {
    [provider in CloudProvider]: { [region: string]: string };
  } = {
    aws: {},
    gcp: {},
    azure: {},
  };
  const fields: {
    [field in KafkaField]: string;
  } = {
    id: t("fields.id"),
    name: t("fields.name"),
    createdAt: t("fields.createdAt"),
    updatedAt: t("fields.updatedAt"),
    expiryDate: t("fields.expiryDate"),
    owner: t("fields.owner"),
    provider: t("fields.provider"),
    region: t("fields.region"),
    status: t("fields.status"),
    plan: t("fields.plan"),
    size: t("fields.size"),
    ingress: t("fields.ingress"),
    egress: t("fields.egress"),
    storage: t("fields.storage"),
    maxPartitions: t("fields.maxPartitions"),
    connections: t("fields.connections"),
    connectionRate: t("fields.connectionRate"),
    messageSize: t("fields.messageSize"),
    billing: t("fields.billing"),
    adminUrl: t("fields.adminUrl"),
    bootstrapUrl: t("fields.bootstrapUrl"),
    version: t("fields.version"),
    az: t("fields.availabilityZone"),
  };
  return {
    fields,
    statuses,
    statusesSimplified,
    providers,
    providerRegions,
  };
}
