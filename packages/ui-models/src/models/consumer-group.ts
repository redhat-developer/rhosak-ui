export type ConsumerGroup = {
  groupId: string;
  state: State;
  consumers: Consumer[];
  laggingPartitions?: number;
  activeConsumers?: number;
  unassignedPartitions?: number;
};

export type Consumer = {
  groupId: string;
  topic: string;
  partition: number;
  offset: number;
  logEndOffset?: number;
  lag: number;
  memberId?: string;
};

export type State =
  | "Stable"
  | "Dead"
  | "Empty"
  | "CompletingRebalance"
  | "PreparingRebalance"
  | "Unknown";

export type ConsumerGroupField = Exclude<
  keyof ConsumerGroup,
  "consumers" | "unassignedPartitions"
>;
