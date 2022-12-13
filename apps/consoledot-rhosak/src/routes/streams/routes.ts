import type { DataPlaneHeaderProps } from "ui";

export const ControlPlaneRouteRoot = "/kafkas" as const;
export const ControlPlaneRoutePath = `${ControlPlaneRouteRoot}/:id?` as const;
export type ControlPlaneRouteParams = { id?: string };

export const DataPlaneRoutePath =
  `${ControlPlaneRouteRoot}/:id/details/:name` as const;
export type DataPlaneRouteParams = { id: string; name: string };
export type DataPlaneRouteProps = {
  instancesHref: DataPlaneHeaderProps["instancesHref"];
};
