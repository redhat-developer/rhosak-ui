const NewInstanceSegment = "create";
const ClusterSegment = "clusters";
export const ControlPlaneSpecialSegments = [NewInstanceSegment, ClusterSegment];

export const ControlPlaneRouteRoot = "/kafkas" as const;
export const ControlPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id?/:section(delete|change-owner)?` as const;
export const ControlPlaneNewInstancePath = `${ControlPlaneRouteRoot}/${NewInstanceSegment}`;
export const ControlPlaneDeleteInstancePath = `${ControlPlaneRouteRoot}/:id/delete`;
export const ControlPlaneChangeOwnerPath = `${ControlPlaneRouteRoot}/:id/change-owner`;
export type ControlPlaneRouteParams = {
  id?: string;
  section?: "delete" | "change-owner";
};

export const DedicatedControlPlaneRouteRoot = "/dedicated" as const;

export const DedicatedControlPlaneRoutePath =
  `${DedicatedControlPlaneRouteRoot}/:id?/:section(delete|change-owner)?` as const;
export const DedicatedControlPlaneClustersPath = `${DedicatedControlPlaneRouteRoot}/${ClusterSegment}`;
export const DedicatedControlPlaneNewInstancePath = `${DedicatedControlPlaneRouteRoot}/${NewInstanceSegment}`;
export const DedicatedControlPlaneDeleteInstancePath = `${DedicatedControlPlaneRouteRoot}/:id/delete`;
export const DedicatedControlPlaneChangeOwnerPath = `${DedicatedControlPlaneRouteRoot}/:id/change-owner`;

export type ControlPlaneNavigationProps = {
  instancesHref: string;
};
