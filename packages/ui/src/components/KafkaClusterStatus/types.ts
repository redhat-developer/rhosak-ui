import type { Status as ClusterStatus } from "ui-models/src/models/dedicated-cluster";

export type PopoverStatus =
  | "accepted"
  | "provisioning"
  | "provisioned"
  | "waitingOperator";

export const PopoverStatusOrder: PopoverStatus[] = [
  "accepted",
  "provisioning",
  "provisioned",
  "waitingOperator",
];

export type Status = ClusterStatus;
