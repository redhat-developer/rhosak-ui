import type { DataPlaneHeaderProps } from "ui";

const root = "/streams" as const;
export const ControlPlaneRoutePath = `${root}/:id?` as const;
export type ControlPlaneRouteParams = { id?: string };

export const DataPlaneRoutePath = `${root}/:id/details/:name` as const;
export type DataPlaneRouteParams = { id: string; name: string };
export type DataPlaneRouteProps = {
  instancesHref: DataPlaneHeaderProps["instancesHref"];
};
