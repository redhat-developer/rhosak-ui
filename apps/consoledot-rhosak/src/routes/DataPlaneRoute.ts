import type { DataPlaneHeaderProps } from "ui";

export type DataPlaneRouteParams = { id: string; name: string };

export type DataPlaneRouteProps = {
  instancesHref: DataPlaneHeaderProps["instancesHref"];
};
