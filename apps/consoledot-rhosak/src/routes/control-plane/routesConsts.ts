export const ControlPlaneRouteRoot = "/kafkas" as const;
const NewInstanceSegment = "create";
export const ControlPlaneSpecialSegments = [NewInstanceSegment];

export const ControlPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id?/:section(delete|change-owner)?` as const;
export const ControlPlaneNewInstancePath = `${ControlPlaneRouteRoot}/${NewInstanceSegment}`;
export const ControlPlaneDeleteInstancePath = `${ControlPlaneRouteRoot}/:id/delete`;
export const ControlPlaneChangeOwnerPath = `${ControlPlaneRouteRoot}/:id/change-owner`;
export type ControlPlaneRouteParams = {
  id?: string;
  section?: "delete" | "change-owner";
};

export type ControlPlaneNavigationProps = {
  instancesHref: string;
};
