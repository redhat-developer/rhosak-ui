import type {
  ConsumerGroupState,
  GroupsApi,
  SortDirection,
} from "@rhoas/kafka-instance-sdk";
import type { ConsumerGroup } from "ui-models/src/models/consumer-group";
import { stateMapping } from "../transformers/consumerGroupTransformer";
import type { KafkaConsumerGroupSortableColumn } from "../types";

export type FetchConsumerGroupsParams = {
  getConsumerGroups: GroupsApi["getConsumerGroups"];
  page?: number;
  perPage?: number;
  sort?: KafkaConsumerGroupSortableColumn;
  direction?: SortDirection;
  topic?: string;
  groupId?: string;
};

export async function fetchConsumerGroups({
  getConsumerGroups,
  page,
  perPage,
  topic,
  groupId,
  sort,
  direction,
}: FetchConsumerGroupsParams): Promise<{
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
    name: t.groupId || "",
    state: stateMapping[t.state as ConsumerGroupState],
    consumers: t.consumers,
    activeConsumers: t.metrics?.activeConsumers,
    laggingPartitions: t.metrics?.laggingPartitions,
    unassignedPartitions: t.metrics?.unassignedPartitions,
  }));
  const count = response.data.total;

  return { count, groups };
}
