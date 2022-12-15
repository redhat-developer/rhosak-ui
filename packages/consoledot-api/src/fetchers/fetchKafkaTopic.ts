import type { TopicAllOf, TopicsApi } from "@rhoas/kafka-instance-sdk";

export type FetchKafkaTopicParams = {
  getTopic: TopicsApi["getTopic"];
  topicName: string;
};

export async function fetchKafkaTopic({
  getTopic,
  topicName,
}: FetchKafkaTopicParams): Promise<Required<TopicAllOf>> {
  const response = await getTopic(topicName);
  return response.data as Required<TopicAllOf>;
}
