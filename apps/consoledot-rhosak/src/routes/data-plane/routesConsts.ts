import type { ControlPlaneNavigationProps } from "../control-plane/routesConsts";
import {
  ControlPlaneRouteRoot,
  DedicatedControlPlaneRouteRoot,
} from "../control-plane/routesConsts";

export const DataPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id/details` as const;
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

export const DataPlaneTopicRoutePath =
  `${ControlPlaneRouteRoot}/:id/details/topics/:topicName` as const;

export const DataPlaneConsumerGroupRoutePath =
  `${ControlPlaneRouteRoot}/:id/details/consumer-groups/:consumerGroupId` as const;


export const DataPlaneTopicConsumerGroupRoutePath =
  `${ControlPlaneRouteRoot}/:id/details/topics/:topicName/consumer-groups/:consumerGroupId` as const;

export const DataPlanePermissionsRoutePath =
  `${ControlPlaneRouteRoot}/:id/details/acls/select-account/:selectedAccount` as const;

export const DataPlaneSelectAccountsRoutePath =
  `${ControlPlaneRouteRoot}/:id/details/acls/select-account` as const;

export const DataPlanePermissionsTableRoutePath =
  `${ControlPlaneRouteRoot}/:id/details/acls` as const;


export const DedicatedDataPlaneRoutePath =
  `${DedicatedControlPlaneRouteRoot}/:id/details` as const;

export const DedicatedDataPlaneTopicRoutePath =
  `${DedicatedControlPlaneRouteRoot}/:id/details/topics/:topicName` as const;

export const DedicatedDataPlaneConsumerGroupRoutePath =
  `${DedicatedControlPlaneRouteRoot}/:id/details/consumer-groups/:consumerGroupId` as const;

export const DedicatedDataPlaneTopicConsumerGroupRoutePath =
  `${DedicatedControlPlaneRouteRoot}/:id/details/topics/:topicName/consumer-groups/:consumerGroupId` as const;

export const DedicatedDataPlanePermissionsRoutePath =
  `${DedicatedControlPlaneRouteRoot}/:id/details/acls/select-account/:selectedAccount` as const;

export const DedicatedDataPlaneSelectAccountsRoutePath =
  `${DedicatedControlPlaneRouteRoot}/:id/details/acls/select-account` as const;

export const DedicatedDataPlanePermissionsTableRoutePath =
  `${DedicatedControlPlaneRouteRoot}/:id/details/acls` as const;


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
} & ControlPlaneNavigationProps;
