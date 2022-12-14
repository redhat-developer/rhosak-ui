import type { DataPlaneHeaderProps } from "ui";

export const ControlPlaneRouteRoot = "/kafkas" as const;
const NewInstanceSegment = "create";
export const ControlPlaneSpecialSegments = [NewInstanceSegment];

export const ControlPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id?/:section(delete)?` as const;
export const ControlPlaneNewInstancePath = `${ControlPlaneRouteRoot}/${NewInstanceSegment}`;
export const ControlPlaneDeleteInstancePath = `${ControlPlaneRouteRoot}/:id/delete`;
export type ControlPlaneRouteParams = { id?: string; section?: "delete" };

export const DataPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id/details/:name` as const;
export type DataPlaneRouteParams = { id: string; name: string };
export type NavigationProps = {
  instancesHref: DataPlaneHeaderProps["instancesHref"];
};
