export const ControlPlaneRouteRoot = "/kafkas" as const;
const NewInstanceSegment = "create";
export const ControlPlaneSpecialSegments = [NewInstanceSegment];

export const ControlPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id?/:section(delete)?` as const;
export const ControlPlaneNewInstancePath = `${ControlPlaneRouteRoot}/${NewInstanceSegment}`;
export const ControlPlaneDeleteInstancePath = `${ControlPlaneRouteRoot}/:id/delete`;
export type ControlPlaneRouteParams = { id?: string; section?: "delete" };

export type ControlPlaneNavigationProps = {
  instancesHref: string;
};
