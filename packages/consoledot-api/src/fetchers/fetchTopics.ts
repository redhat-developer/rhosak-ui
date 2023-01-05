import type { SortDirection, TopicsApi } from "@rhoas/kafka-instance-sdk";
import type { Plan } from "ui-models/src/models/kafka";
import type { Topic } from "ui-models/src/models/topic";
import { topicTransformerFactory } from "../transformers/topicTransformer";
import type { KafkaTopicsSortableColumn } from "../types";

export type FetchTopicsParams = {
  getTopics: TopicsApi["getTopics"];
  page?: number;
  perPage?: number;
  sort?: KafkaTopicsSortableColumn;
  direction?: SortDirection;
  filter?: string;
  plan: Plan;
};

export async function fetchTopics({
  getTopics,
  page,
  perPage,
  filter,
  sort,
  direction,
  plan,
}: FetchTopicsParams): Promise<{ topics: Topic[]; count: number }> {
  const response = await getTopics(
    undefined,
    undefined,
    perPage,
    filter,
    page,
    direction,
    sort
  );
  const topics = (response.data.items || []).map<Topic>(
    topicTransformerFactory(plan)
  );
  const count = response.data.total;
  return { count, topics };
}
