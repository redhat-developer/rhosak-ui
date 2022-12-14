import type {
  ConsumerGroupState,
  GroupsApi,
  SortDirection,
} from "@rhoas/kafka-instance-sdk";
import type { ConsumerGroup } from "ui";
import type { KafkaConsumerGroupSortableColumn } from "../types";

export type FetchKafkaConsumerGroupsParams = {
  getConsumerGroups: GroupsApi["getConsumerGroups"];
  page?: number;
  perPage?: number;
  sort?: KafkaConsumerGroupSortableColumn;
  direction?: SortDirection;
  topic?: string;
  groupId?: string;
};

export async function fetchKafkaConsumerGroups({
  getConsumerGroups,
  page,
  perPage,
  topic,
  groupId,
  sort,
  direction,
}: FetchKafkaConsumerGroupsParams): Promise<{
  groups: ConsumerGroup[];
  count: number;
}> {
  const response = await getConsumerGroups(
    undefined,
    undefined,
    perPage,
    page,
    topic,
    groupId,
    direction,
    sort
  );
  const groups = (response.data.items || []).map<ConsumerGroup>((t) => ({
    consumerGroupId: t.groupId || "",
    activeMembers: t.metrics?.activeConsumers || 0,
    partitionsWithLag: t.metrics?.laggingPartitions || 0,
    state: stateMapping[t.state as ConsumerGroupState],
  }));
  const count = response.data.total;
  return { count, groups };
}

const stateMapping: { [state in ConsumerGroupState]: ConsumerGroup["state"] } =
  {
    DEAD: "Dead",
    EMPTY: "Empty",
    STABLE: "Stable",
    UNKNOWN: "Unknown",
    COMPLETING_REBALANCE: "CompletingRebalance",
    PREPARING_REBALANCE: "PreparingRebalance",
  };
