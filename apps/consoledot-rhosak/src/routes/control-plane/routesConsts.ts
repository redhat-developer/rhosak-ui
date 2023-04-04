const NewInstanceSegment = "create";
const DeleteSegment = "delete";
const ChangeOwnerSegment = "change-owner";
const TermsAndConditionsSegment = "terms-and-conditions";
export const ControlPlaneSpecialSegments = [
  NewInstanceSegment,
  TermsAndConditionsSegment,
];

export const ControlPlaneRouteRoot = "/kafkas" as const;

export const ControlPlaneRoutePath = `${ControlPlaneRouteRoot}` as const;
export const ControlPlaneNewInstanceRoutePath =
  `${ControlPlaneRoutePath}/${NewInstanceSegment}` as const;
export const ControlPlaneSelectedInstanceRoutePath = (instanceId: string) =>
  `${ControlPlaneRoutePath}/${instanceId}` as const;
export const ControlPlaneDeleteInstanceRoutePath = (instanceId: string) =>
  `${ControlPlaneSelectedInstanceRoutePath(
    instanceId
  )}/${DeleteSegment}` as const;
export const ControlPlaneChangeOwnerRoutePath = (instanceId: string) =>
  `${ControlPlaneSelectedInstanceRoutePath(
    instanceId
  )}/${ChangeOwnerSegment}` as const;

export const ControlPlaneRouteMatch =
  `${ControlPlaneRoutePath}/:id?/:section(${DeleteSegment}|${ChangeOwnerSegment})?` as const;
export const ControlPlaneTermsAndConditionsMatch =
  `${ControlPlaneRoutePath}/${TermsAndConditionsSegment}` as const;
export const ControlPlaneNewInstanceMatch =
  `${ControlPlaneRoutePath}/${NewInstanceSegment}` as const;
export const ControlPlaneDeleteInstanceMatch =
  `${ControlPlaneRoutePath}/:id/${DeleteSegment}` as const;
export const ControlPlaneChangeOwnerMatch =
  `${ControlPlaneRoutePath}/:id/${ChangeOwnerSegment}` as const;

export const ControlPlaneClustersPath = `/clusters`;

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
