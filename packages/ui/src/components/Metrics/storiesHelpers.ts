import { fakeApi } from "..//storiesHelpers";
import { makeGrowingMetrics, makeMetrics } from "./makeMetrics";
import type {
  DurationOptions,
  GetKafkaInstanceMetricsResponse,
  GetMetricsKpiResponse,
  GetTopicsMetricsResponse,
} from "./types";

export const getKafkaInstanceMetrics = ({
  duration,
  offset,
  waitLengthMs,
}: {
  duration: DurationOptions;
  offset?: number;
  waitLengthMs?: number;
}) => {
  return fakeApi<GetKafkaInstanceMetricsResponse>(
    {
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9, offset),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1, offset),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1, offset),
      connectionsLimit: 100,
      diskSpaceLimit: 1000,
      connectionRateLimit: 50,
    },
    waitLengthMs
  );
};

export const getMetricsKpi = ({
  waitLengthMs,
}: { waitLengthMs?: number } = {}) => {
  return fakeApi<GetMetricsKpiResponse>(
    {
      topics: 3,
      topicPartitions: 6,
      consumerGroups: 12,
      topicPartitionsLimit: 1000,
    },
    waitLengthMs
  );
};

export const getTopicsMetrics = ({
  duration,
  selectedTopic,
  offset,
  waitLengthMs,
}: {
  duration: DurationOptions;
  selectedTopic?: string;
  offset?: number;
  waitLengthMs?: number;
}) => {
  return fakeApi<GetTopicsMetricsResponse>(
    {
      kafkaTopics: ["lorem", "dolor", "ipsum"],
      metricsTopics: ["lorem", "dolor", "ipsum", "sit"],
      bytesIncoming: makeGrowingMetrics(
        duration,
        0,
        9,
        10 ** 7,
        10 ** 4,
        offset
      ),
      bytesOutgoing: makeGrowingMetrics(
        duration,
        3,
        8,
        10 ** 7,
        10 ** 4,
        offset
      ),
      incomingMessageRate: makeMetrics(duration, 3, 8, 10, offset),
      bytesPerPartition: selectedTopic
        ? {
          "0": makeMetrics(duration, 0, 2, 10 ** 7, offset),
          "1": makeMetrics(duration, 0, 4, 10 ** 7, offset),
          "2": makeMetrics(duration, 0, 6, 10 ** 7, offset),
          "3": makeMetrics(duration, 0, 8, 10 ** 7, offset),
          "4": makeMetrics(duration, 0, 12, 10 ** 7, offset),
          "5": makeMetrics(duration, 0, 20, 10 ** 7, offset),
          "6": makeMetrics(duration, 0, 18, 10 ** 7, offset),
          "7": makeMetrics(duration, 0, 13, 10 ** 7, offset),
          "8": makeMetrics(duration, 0, 7, 10 ** 7, offset),
          "9": makeMetrics(duration, 0, 5, 10 ** 7, offset),
          "10": makeMetrics(duration, 0, 24, 10 ** 7, offset),
          "11": makeMetrics(duration, 0, 29, 10 ** 7, offset),
          "12": makeMetrics(duration, 0, 23, 10 ** 7, offset),
          "13": makeMetrics(duration, 0, 32, 10 ** 7, offset),
          "14": makeMetrics(duration, 0, 32, 10 ** 7, offset),
          "15": makeMetrics(duration, 0, 30, 10 ** 7, offset),
          "16": makeMetrics(duration, 0, 24, 10 ** 7, offset),
          "17": makeMetrics(duration, 0, 27, 10 ** 7, offset),
          "18": makeMetrics(duration, 0, 27, 10 ** 7, offset),
          "19": makeMetrics(duration, 0, 40, 10 ** 7, offset),
          "20": makeMetrics(duration, 0, 26, 10 ** 7, offset),
        }
      : {},
    },
    waitLengthMs
  );
};

export const getTopicsMetricsWithDeletedTopicMetric = ({
  duration,
  selectedTopic,
  offset,
  waitLengthMs,
}: {
  duration: DurationOptions;
  selectedTopic?: string;
  offset?: number;
  waitLengthMs?: number;
}) => {
  const hasMetrics =
    selectedTopic === undefined ||
    selectedTopic !== "topic deleted in the past" ||
    (selectedTopic === "topic deleted in the past" && duration > 60);
  return fakeApi<GetTopicsMetricsResponse>(
    {
      kafkaTopics: ["lorem", "dolor", "ipsum"],
      metricsTopics:
        duration <= 60
          ? ["lorem", "dolor", "ipsum"]
          : ["lorem", "dolor", "ipsum", "topic deleted in the past"],
      bytesIncoming: hasMetrics
        ? makeGrowingMetrics(duration, 0, 9, 10 ** 7, 10 ** 4, offset)
        : {},
      bytesOutgoing: hasMetrics
        ? makeGrowingMetrics(duration, 3, 8, 10 ** 7, 10 ** 4, offset)
        : {},
      incomingMessageRate: hasMetrics
        ? makeMetrics(duration, 3, 8, 10, offset)
        : {},
      bytesPerPartition: hasMetrics
        ? {
          "0": makeMetrics(duration, 0, 2, 10 ** 7, offset),
          "1": makeMetrics(duration, 0, 4, 10 ** 7, offset),
          "2": makeMetrics(duration, 0, 6, 10 ** 7, offset),
          "3": makeMetrics(duration, 0, 8, 10 ** 7, offset),
          "4": makeMetrics(duration, 0, 12, 10 ** 7, offset),
          "5": makeMetrics(duration, 0, 20, 10 ** 7, offset),
          "6": makeMetrics(duration, 0, 18, 10 ** 7, offset),
          "7": makeMetrics(duration, 0, 13, 10 ** 7, offset),
          "8": makeMetrics(duration, 0, 12, 10 ** 7, offset),
          }
        : {},
    },
    waitLengthMs
  );
};

export const getTopicsMetricsOneTopic = ({
  duration,
  offset,
  waitLengthMs,
}: {
  duration: DurationOptions;
  offset?: number;
  waitLengthMs?: number;
}) => {
  return fakeApi<GetTopicsMetricsResponse>(
    {
      kafkaTopics: ["lorem"],
      metricsTopics: ["lorem"],
      bytesIncoming: makeGrowingMetrics(
        duration,
        0,
        9,
        10 ** 7,
        10 ** 4,
        offset
      ),
      bytesOutgoing: makeGrowingMetrics(
        duration,
        3,
        8,
        10 ** 7,
        10 ** 4,
        offset
      ),
      incomingMessageRate: makeMetrics(duration, 3, 8, 10, offset),
      bytesPerPartition: {
        "0": makeMetrics(duration, 0, 2, 10 ** 7, offset),
        "1": makeMetrics(duration, 0, 4, 10 ** 7, offset),
        "2": makeMetrics(duration, 0, 6, 10 ** 7, offset),
        "3": makeMetrics(duration, 0, 8, 10 ** 7, offset),
        "4": makeMetrics(duration, 0, 12, 10 ** 7, offset),
        "5": makeMetrics(duration, 0, 20, 10 ** 7, offset),
        "6": makeMetrics(duration, 0, 18, 10 ** 7, offset),
        "7": makeMetrics(duration, 0, 13, 10 ** 7, offset),
        "8": makeMetrics(duration, 0, 12, 10 ** 7, offset),
      },
    },
    waitLengthMs
  );
};
