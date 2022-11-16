import { lazy } from "react";

export const ControlPlaneRoute = lazy(
  () =>
    import(/* webpackChunkName: "ControlPlaneRoute" */ "./ControlPlaneRoute")
);

export const DataPlaneRoute = lazy(
  () => import(/* webpackChunkName: "DataPlaneRoute" */ "./DataPlaneRoute")
);
