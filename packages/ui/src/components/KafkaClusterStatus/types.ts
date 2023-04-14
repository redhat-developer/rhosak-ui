export type PopoverStatus =
  | "cluster-accepted"
  | "provisioning"
  | "provisioned"
  | "preparing";

export const PopoverStatusOrder: PopoverStatus[] = [
  "cluster-accepted",
  "provisioning",
  "provisioned",
  "preparing",
];

export type Status = "registering" | "unregistering" | "ready" | "failed";
