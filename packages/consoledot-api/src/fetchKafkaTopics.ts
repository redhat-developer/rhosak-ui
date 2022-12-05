import type { Topic, TopicsApi } from "@rhoas/kafka-instance-sdk";

export async function fetchKafkaTopics(
  getTopics: TopicsApi["getTopics"]
): Promise<string[]> {
  const response = await getTopics(
    undefined,
    100,
    100,
    undefined,
    undefined,
    undefined,
    undefined
  );
  return (response.data.items || []).map((t: Topic) => t.name as string);
}
