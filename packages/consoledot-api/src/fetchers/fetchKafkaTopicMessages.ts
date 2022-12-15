import type { Record, RecordsApi } from "@rhoas/kafka-instance-sdk";
import type { DateIsoString, Message } from "ui";

export type FetchKafkaTopicMessagesParams = {
  consumeRecords: RecordsApi["consumeRecords"];
  topicName: string;
  partition?: number;
  offset?: number;
  timestamp?: DateIsoString;
  limit: number;
};

export async function fetchKafkaTopicMessages({
  topicName,
  consumeRecords,
  partition,
  offset,
  timestamp,
  limit,
}: FetchKafkaTopicMessagesParams): Promise<Message[]> {
  const response = await consumeRecords(
    topicName,
    undefined,
    limit,
    undefined,
    offset,
    partition,
    timestamp
  );
  return response.data.items.map((m: Record) => ({
    partition: m.partition,
    offset: m.offset,
    timestamp: m.timestamp,
    key: m.key,
    value: m.value,
    headers: m.headers || {},
  }));
}
