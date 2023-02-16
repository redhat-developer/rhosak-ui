import type { GroupsApi } from "@rhoas/kafka-instance-sdk";
import type { ConsumerGroup } from "ui-models/src/models/consumer-group";
import { consumerGroupTransformer } from "../transformers/consumerGroupTransformer";

export type FetchConsumerGroupParams = {
  getConsumerGroupById: GroupsApi["getConsumerGroupById"];
  consumerGroupId: string;
};

export async function fetchConsumerGroup({
  getConsumerGroupById,
  consumerGroupId,
}: FetchConsumerGroupParams): Promise<ConsumerGroup> {
  const response = await getConsumerGroupById(consumerGroupId);
  return consumerGroupTransformer(response.data);
}
