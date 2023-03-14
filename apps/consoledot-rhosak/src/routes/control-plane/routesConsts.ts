const NewInstanceSegment = "create";
const DeleteSegment = "delete";
const ChangeOwnerSegment = "change-owner";
const TermsAndConditionsSegment = "terms-and-conditions";
export const ControlPlaneSpecialSegments = [
  NewInstanceSegment,
  TermsAndConditionsSegment,
];

export const ControlPlaneRouteRoot = "/legacy" as const;
export const ControlPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id?/:section(${DeleteSegment}|${ChangeOwnerSegment})?` as const;
export const ControlPlaneNewInstancePath =
  `${ControlPlaneRouteRoot}/${NewInstanceSegment}` as const;
export const ControlPlaneTermsAndConditionsPath =
  `${ControlPlaneRouteRoot}/${TermsAndConditionsSegment}` as const;
export const ControlPlaneDeleteInstancePath =
  `${ControlPlaneRouteRoot}/:id/delete` as const;
export const ControlPlaneChangeOwnerPath =
  `${ControlPlaneRouteRoot}/:id/change-owner` as const;

export const DedicatedControlPlaneRouteRoot = "/kafkas" as const;

export const DedicatedControlPlaneRoutePath =
  `${DedicatedControlPlaneRouteRoot}` as const;
export const DedicatedControlPlaneNewInstanceRoutePath =
  `${DedicatedControlPlaneRoutePath}/${NewInstanceSegment}` as const;
export const DedicatedControlPlaneSelectedInstanceRoutePath = (
  instanceId: string
) => `${DedicatedControlPlaneRoutePath}/${instanceId}` as const;
export const DedicatedControlPlaneDeleteInstanceRoutePath = (
  instanceId: string
) =>
  `${DedicatedControlPlaneSelectedInstanceRoutePath(
    instanceId
  )}/${DeleteSegment}` as const;
export const DedicatedControlPlaneChangeOwnerRoutePath = (instanceId: string) =>
  `${DedicatedControlPlaneSelectedInstanceRoutePath(
    instanceId
  )}/${ChangeOwnerSegment}` as const;

export const DedicatedControlPlaneRouteMatch =
  `${DedicatedControlPlaneRoutePath}/:id?/:section(${DeleteSegment}|${ChangeOwnerSegment})?` as const;
export const DedicatedControlPlaneTermsAndConditionsMatch =
  `${DedicatedControlPlaneRoutePath}/${TermsAndConditionsSegment}` as const;
export const DedicatedControlPlaneNewInstanceMatch =
  `${DedicatedControlPlaneRoutePath}/${NewInstanceSegment}` as const;
export const DedicatedControlPlaneDeleteInstanceMatch =
  `${DedicatedControlPlaneRoutePath}/:id/${DeleteSegment}` as const;
export const DedicatedControlPlaneChangeOwnerMatch =
  `${DedicatedControlPlaneRoutePath}/:id/${ChangeOwnerSegment}` as const;

export const DedicatedControlPlaneClustersPath = `/clusters`;

export type ControlPlaneRouteParams = {
  id?: string;
  section?: "delete" | "change-owner";
};

export type ControlPlaneNavigationProps = {
  instancesHref: string;
};

export type DedicatedControlPlaneNavigationProps = {
  instancesHref: string;
  clustersHref: string;
};
