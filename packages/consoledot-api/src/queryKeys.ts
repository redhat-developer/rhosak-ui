import { FetchKafkaConsumerGroupsParams } from "./fetchKafkaConsumerGroups";
import type { FetchKafkaInstanceMetricsProps } from "./fetchKafkaInstanceMetrics";
import type { FetchKafkaInstancesParams } from "./fetchKafkaInstances";
import type { FetchTopicsMetricsProps } from "./fetchKafkaTopicMetrics";
import type { FetchKafkaTopicsParams } from "./fetchKafkaTopics";

export const masQueries = {
  _root: () => ({ scope: "mas" } as const),
  organization: () =>
    [{ ...masQueries._root(), entity: "organization" }] as const,
  quota: (params: { organization?: string }) =>
    [{ ...masQueries._root, entity: "quota", ...params }] as const,
} as const;

export const kafkaQueries = {
  _root: () => ({ scope: "kafka" } as const),
  list: (params: Omit<FetchKafkaInstancesParams, "dataMapper" | "getKafkas">) =>
    [
      {
        ...kafkaQueries._root(),
        entity: "list",
      },
      params,
    ] as const,
  instance: {
    _root: ({ id }: { id?: string }) =>
      ({ ...kafkaQueries._root(), entity: "instance", id } as const),
    details: (params: { id?: string }) =>
      [
        { ...kafkaQueries.instance._root(params), subentity: "details" },
      ] as const,
    topics: (
      params: { id?: string; adminUrl?: string } & Omit<
        FetchKafkaTopicsParams,
        "getTopics"
      >
    ) =>
      [
        {
          ...kafkaQueries.instance._root(params),
          subentity: "topics",
        },
        params,
      ] as const,
    consumerGroups: (
      params: { id?: string; adminUrl?: string } & Omit<
        FetchKafkaConsumerGroupsParams,
        "getConsumerGroups"
      >
    ) =>
      [
        {
          ...kafkaQueries.instance._root(params),
          subentity: "consumer-groups",
        },
        params,
      ] as const,
    metrics: {
      _root: ({ id }: { id: string }) =>
        ({
          ...kafkaQueries.instance._root({ id }),
          subentity: "metrics",
          id,
        } as const),
      kpi: (params: { id: string }) =>
        [{ ...kafkaQueries.instance._root(params), type: "kpi" }] as const,
      instance: ({
        id,
        ...params
      }: Omit<FetchKafkaInstanceMetricsProps, "getMetricsByRangeQuery">) =>
        [
          {
            ...kafkaQueries.instance._root({ id }),
            type: "instance",
          },
          params,
        ] as const,
      topic: ({
        id,
        ...params
      }: Omit<FetchTopicsMetricsProps, "getMetricsByRangeQuery">) =>
        [
          {
            ...kafkaQueries.instance._root({ id }),
            type: "topic",
          },
          params,
        ] as const,
    },
  },
} as const;

export const providerQueries = {
  _root: () => ({ scope: "providers" }),
  list: (params: { plan?: string }) =>
    [{ ...providerQueries._root(), entity: "list", ...params }] as const,
  limits: {
    _root: ({ provider }: { provider?: string }) =>
      ({
        ...providerQueries._root(),
        entity: "limits",
        provider,
      } as const),
    standard: (params: { provider?: string }) => [
      { ...providerQueries.limits._root({ ...params }), plan: "standard" },
    ],
    developer: (params: { provider?: string }) => [
      {
        ...providerQueries.limits._root({ ...params }),
        plan: "developer",
      },
    ],
  },
} as const;
