import type { KafkaInstanceEnhanced } from "consoledot-api/src/transformers/kafkaRequestToKafkaInstanceEnhanched";
import { ReadyStatuses, SuspendedStatuses } from "ui-models/src/models/kafka";
import type { Status } from "ui-models/src/models/kafka";

export function canOpenConnection(instance: KafkaInstanceEnhanced): boolean {
  return instance ? ReadyStatuses.includes(instance.status) : false;
}

export const isUserOwnerOrAdmin = (
  owner: string,
  username: string,
  isOrgAdmin: boolean
) => {
  return owner === username || isOrgAdmin;
};

export const canChangeOwner = (
  owner: string,
  status: Status,
  username: string,
  isOrgAdmin: boolean
) => {
  return (
    owner === username || (isOrgAdmin && !SuspendedStatuses.includes(status))
  );
};
