export const ControlPlaneRouteRoot = "/kafkas" as const;
const NewInstanceSegment = "create";
const TermsAndConditionsSegment = "terms-and-conditions";
export const ControlPlaneSpecialSegments = [
  NewInstanceSegment,
  TermsAndConditionsSegment,
];

export const ControlPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id?/:section(delete|change-owner)?` as const;
export const ControlPlaneNewInstancePath = `${ControlPlaneRouteRoot}/${NewInstanceSegment}`;
export const ControlPlaneTermsAndConditionsPath = `${ControlPlaneRouteRoot}/${TermsAndConditionsSegment}`;
export const ControlPlaneDeleteInstancePath = `${ControlPlaneRouteRoot}/:id/delete`;
export const ControlPlaneChangeOwnerPath = `${ControlPlaneRouteRoot}/:id/change-owner`;
export type ControlPlaneRouteParams = {
  id?: string;
  section?: "delete" | "change-owner";
};

export type ControlPlaneNavigationProps = {
  instancesHref: string;
};
