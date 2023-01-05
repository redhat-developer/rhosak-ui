import type { TopicAllOf, TopicsApi } from "@rhoas/kafka-instance-sdk";

export type FetchTopicParams = {
  getTopic: TopicsApi["getTopic"];
  topicName: string;
};

export async function fetchTopic({
  getTopic,
  topicName,
}: FetchTopicParams): Promise<Required<TopicAllOf>> {
  const response = await getTopic(topicName);
  return response.data as Required<TopicAllOf>;
}
