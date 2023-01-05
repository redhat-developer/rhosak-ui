import type { TopicsApi } from "@rhoas/kafka-instance-sdk";
import type { Plan } from "ui-models/src/models/kafka";
import type { Topic } from "ui-models/src/models/topic";
import { topicTransformerFactory } from "../transformers/topicTransformer";

export type FetchTopicParams = {
  getTopic: TopicsApi["getTopic"];
  topicName: string;
  plan: Plan;
};

export async function fetchTopic({
  getTopic,
  topicName,
  plan,
}: FetchTopicParams): Promise<Topic> {
  const response = await getTopic(topicName);
  return topicTransformerFactory(plan)(response.data);
}
