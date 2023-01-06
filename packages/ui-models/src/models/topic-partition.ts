export type TopicPartition = {
  partition: number;
  replicas?: Array<Node>;
  isr?: Array<Node>;
  leader?: Node;
  id?: number;
};

/**
 * Identifier for a Kafka server / broker.
 */
export type Node = {
  id?: number;
};
