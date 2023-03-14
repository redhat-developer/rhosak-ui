import type {
  ConsumerGroup as ConsumerGroupApi,
  ConsumerGroupState,
} from "@rhoas/kafka-instance-sdk";
import type {
  Consumer,
  ConsumerGroup,
} from "ui-models/src/models/consumer-group";

export function consumerGroupTransformer(t: ConsumerGroupApi): ConsumerGroup {
  const state = stateMapping[t.state as ConsumerGroupState];
  return {
    name: t.groupId,
    state: state,
    consumers: t.consumers.map<Consumer>((consumer) => ({
      groupId: consumer.groupId,
      topic: consumer.topic,
      lag: consumer.lag,
      memberId: consumer.memberId,
      partition: consumer.partition,
      offset: consumer.offset,
      logEndOffset: consumer.logEndOffset,
    })),
    activeConsumers: t.metrics?.activeConsumers,
    laggingPartitions: t.metrics?.laggingPartitions,
    unassignedPartitions: t.metrics?.unassignedPartitions,
  };
}

export const stateMapping: {
  [state in ConsumerGroupState]: ConsumerGroup["state"];
} = {
  DEAD: "Dead",
  EMPTY: "Empty",
  STABLE: "Stable",
  UNKNOWN: "Unknown",
  COMPLETING_REBALANCE: "CompletingRebalance",
  PREPARING_REBALANCE: "PreparingRebalance",
};
