import type { ControlPlaneNavigationProps } from "../control-plane/routesConsts";

export const DataPlaneRoutePath = (root: string) =>
  `${root}/:id/details` as const;

export const DataPlaneTopicRoutePath = (root: string) =>
  `${root}/:id/details/topics/:topicName` as const;

export const DataPlaneConsumerGroupRoutePath = (root: string) =>
  `${root}/:id/details/consumer-groups/:consumerGroupId` as const;

export const DataPlaneTopicConsumerGroupRoutePath = (root: string) =>
  `${root}/:id/details/topics/:topicName/consumer-groups/:consumerGroupId` as const;

export const DataPlanePermissionsRoutePath = (root: string) =>
  `${root}/:id/details/acls/select-account/:selectedAccount` as const;

export const DataPlaneSelectAccountsRoutePath = (root: string) =>
  `${root}/:id/details/acls/select-account` as const;

export const DataPlanePermissionsTableRoutePath = (root: string) =>
  `${root}/:id/details/acls` as const;

export type DataPlaneRouteParams = { id: string };
export type DataPlaneTopicRouteParams = { id: string; topicName: string };
export type DataPlaneConsumerGroupRouteParams = {
  id: string;
  consumerGroupId: string;
};

export type DataPlaneTopicConsumerRouteParams = {
  id: string;
  topicName: string;
  consumerGroupId: string;
};

export type DataPlanePermissionsRouteParams = {
  selectedAccount: string;
};

export type DataPlaneNavigationProps = {
  instanceDetailsHref: (instanceId: string) => string;
  instanceTopicsHref: (instanceId: string) => string;
  instanceConsumerGroupsHref: (instanceId: string) => string;
} & ControlPlaneNavigationProps;

export type DataPlaneTopicNavigationProps = {
  instanceDetailsHref: (instanceId: string) => string;
  instanceTopicsHref: (instanceId: string) => string;
  instanceConsumerGroupsHref: (instanceId: string) => string;
  topicHref: (instanceId: string, topicName: string) => string;
  deleteTopicHref: (instanceId: string, topicName: string) => string;
  updateTopicHref: (instanceId: string, topicName: string) => string;
} & ControlPlaneNavigationProps;

export type DataPlaneConsumerGroupNavigationsProps = {
  instanceTopicsHref: (instanceId: string) => string;
  instanceDetailsHref: (instanceId: string) => string;
  instanceConsumerGroupsHref: (instanceId: string) => string;
  viewPartitionConsumerGroupHref: (
    instanceId: string,
    consumerGroupId: string
  ) => string;
} & ControlPlaneNavigationProps;

export type DataPlaneTopicConsumerGroupNavigationsProps = {
  instanceTopicConsumerGroupsHref: (
    instanceId: string,
    topicName: string
  ) => string;
  viewTopicPartitionConsumerGroupHref: (
    instanceId: string,
    consumerGroupId: string,
    topicName: string
  ) => string;
  instanceDetailsHref: (instanceId: string) => string;
  instanceTopicsHref: (instanceId: string) => string;
  instanceConsumerGroupsHref: (instanceId: string) => string;
} & ControlPlaneNavigationProps;

export type DataPlanePermissionsNavigationProps = {
  managePermissionsHref: (instanceId: string) => string;
  editPermissionsHref: (instanceId: string, selectedAccount: string) => string;
} & ControlPlaneNavigationProps;
