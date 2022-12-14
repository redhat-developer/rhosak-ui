import type {
  SortDirection,
  Topic,
  TopicsApi,
} from "@rhoas/kafka-instance-sdk";
import type { KafkaTopic } from "ui";
import type { KafkaTopicsSortableColumn } from "../types";

export type FetchKafkaTopicsParams = {
  getTopics: TopicsApi["getTopics"];
  page?: number;
  perPage?: number;
  sort?: KafkaTopicsSortableColumn;
  direction?: SortDirection;
  filter?: string;
};

export async function fetchKafkaTopics({
  getTopics,
  page,
  perPage,
  filter,
  sort,
  direction,
}: FetchKafkaTopicsParams): Promise<{ topics: KafkaTopic[]; count: number }> {
  const response = await getTopics(
    undefined,
    undefined,
    perPage,
    filter,
    page,
    direction,
    sort
  );
  const topics = (response.data.items || []).map((t: Topic) => ({
    topic_name: t.name!,
    partitions: t.partitions?.length || 0,
    retention_size:
      t.config?.find(({ key }) => key === "retention.bytes")?.value || "",
    retention_time:
      t.config?.find(({ key }) => key === "retention.ms")?.value || "",
  }));
  const count = response.data.total;
  return { count, topics };
}
