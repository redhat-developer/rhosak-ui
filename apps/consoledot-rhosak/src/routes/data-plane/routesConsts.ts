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
} & ControlPlaneNavigationProps;
