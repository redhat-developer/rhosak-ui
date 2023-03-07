import type {
  FetchConsumerGroupParams,
  FetchConsumerGroupsParams,
  FetchKafkaMetricsProps,
  FetchKafkasParams,
  FetchMessagesParams,
  FetchPermissionsParams,
  FetchServiceAccountsParams,
  FetchTopicParams,
  FetchTopicsMetricsProps,
  FetchTopicsParams,
  FetchUserAccountsParams,
} from "./fetchers";

export const masQueries = {
  _root: () => ({ scope: "mas" } as const),
  organization: () =>
    [{ ...masQueries._root(), entity: "organization" }] as const,
  userAccounts: (params: Omit<FetchUserAccountsParams, "getUserAccounts">) =>
    [{ ...masQueries._root(), entity: "userAccounts" }, params] as const,
  user: () => [{ ...masQueries._root(), entity: "user" }] as const,

  quota: {
    _root: () => ({ ...masQueries._root(), entity: "quota" } as const),
    available: (params: { organization?: string }) =>
      [
        { ...masQueries.quota._root(), subentity: "available", ...params },
      ] as const,
    developerAvailability: () =>
      [
        { ...masQueries.quota._root(), subentity: "developerAvailability" },
      ] as const,
    standardAvailability: () =>
      [
        { ...masQueries.quota._root(), subentity: "standardAvailability" },
      ] as const,
  },
} as const;

export const kafkaQueries = {
  _root: () => ({ scope: "kafka" } as const),
  list: (params: Omit<FetchKafkasParams, "dataMapper" | "getKafkas">) =>
    [
      {
        ...kafkaQueries._root(),
        entity: "list",
      },
      params,
    ] as const,
  instance: {
    _root: ({ id, adminUrl }: { id?: string; adminUrl?: string }) =>
      ({ ...kafkaQueries._root(), entity: "instance", id, adminUrl } as const),
    details: (params: { id?: string }) =>
      [
        { ...kafkaQueries.instance._root(params), subentity: "details" },
      ] as const,
    topics: ({
      id,
      adminUrl,
      ...params
    }: { id?: string; adminUrl?: string } & Omit<
      FetchTopicsParams,
      "getTopics"
    >) =>
      [
        {
          ...kafkaQueries.instance._root({ id, adminUrl }),
          subentity: "topics",
        },
        params,
      ] as const,
    topic: ({
      id,
      adminUrl,
      topicName,
    }: { id?: string; adminUrl?: string } & Omit<
      FetchTopicParams,
      "getTopic"
    >) =>
      [
        {
          ...kafkaQueries.instance._root({ id, adminUrl }),
          subentity: "topic",
        },
        { topicName },
      ] as const,
    topicMessages: ({
      id,
      adminUrl,
      topicName,
      ...params
    }: { id?: string; adminUrl?: string } & Omit<
      FetchMessagesParams,
      "consumeRecords"
    >) =>
      [
        {
          ...kafkaQueries.instance._root({ id, adminUrl }),
          subentity: "topicMessages",
        },
        { topicName, ...params },
      ] as const,
    consumerGroups: (
      params: { id?: string; adminUrl?: string } & Omit<
        FetchConsumerGroupsParams,
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
    consumerGroup: ({
      id,
      adminUrl,
      consumerGroupId,
    }: { id?: string; adminUrl?: string } & Omit<
      FetchConsumerGroupParams,
      "getConsumerGroupById"
    >) =>
      [
        {
          ...kafkaQueries.instance._root({ id, adminUrl }),
          subentity: "consumerGroup",
        },
        { consumerGroupId },
      ] as const,
    serviceAccounts: (
      params: Omit<FetchServiceAccountsParams, "getServiceAccounts">
    ) =>
      [{ ...masQueries._root(), entity: "serviceAccounts" }, params] as const,
    permissions: (
      params: { id?: string; adminUrl?: string } & Omit<
        FetchPermissionsParams,
        "getAcls"
      >
    ) =>
      [
        {
          ...kafkaQueries.instance._root(params),
          subentity: "acls",
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
      }: Omit<FetchKafkaMetricsProps, "getMetricsByRangeQuery">) =>
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
    standard: ({ provider, region }: { provider?: string; region: string }) => [
      {
        ...providerQueries.limits._root({ provider }),
        plan: "standard",
        region,
      },
    ],
    developer: ({
      provider,
      region,
    }: {
      provider?: string;
      region: string;
    }) => [
      {
        ...providerQueries.limits._root({ provider }),
        plan: "developer",
        region,
      },
    ],
  },
} as const;
