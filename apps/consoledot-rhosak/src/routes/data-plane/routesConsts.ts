import type { ControlPlaneNavigationProps } from "../control-plane/routesConsts";
import { ControlPlaneRouteRoot } from "../control-plane/routesConsts";

export const DataPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id/details` as const;
export type DataPlaneRouteParams = { id: string };
export type DataPlaneTopicRouteParams = { id: string; topicName: string };

export const DataPlaneTopicRoutePath =
  `${ControlPlaneRouteRoot}/:id/details/topics/:topicName` as const;

export type DataPlaneNavigationProps = {
  instanceDetailsHref: (instanceId: string) => string;
  instanceTopicsHref: (instanceId: string) => string;
} & ControlPlaneNavigationProps;

export type DataPlaneTopicNavigationProps = {
  instanceDetailsHref: (instanceId: string) => string;
  instanceTopicsHref: (instanceId: string) => string;
  topicHref: (instanceId: string, topicName: string) => string;
  deleteTopicHref: (instanceId: string, topicName: string) => string;
  updateTopicHref: (instanceId: string, topicName: string) => string;
} & ControlPlaneNavigationProps;
