import type { Record, RecordsApi } from "@rhoas/kafka-instance-sdk";
import type { Message } from "ui-models/src/models/message";
import type { DateIsoString } from "../../../ui-models/src/types";

export type FetchMessagesParams = {
  consumeRecords: RecordsApi["consumeRecords"];
  topicName: string;
  partition?: number;
  offset?: number;
  timestamp?: DateIsoString;
  limit: number;
};

export async function fetchMessages({
  topicName,
  consumeRecords,
  partition,
  offset,
  timestamp,
  limit,
}: FetchMessagesParams): Promise<Message[]> {
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
    timestamp: m.timestamp as DateIsoString,
    key: m.key,
    value: m.value,
    headers: m.headers || {},
  }));
}
