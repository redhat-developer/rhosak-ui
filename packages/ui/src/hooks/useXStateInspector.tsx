import { isDevToolsEnabled } from "local-storage-helpers";
import { lazy } from "react";

const XStateInspector = lazy(() => import("./XStateInspector"));

export function useXStateInspector() {
  const showDevTools = isDevToolsEnabled();
  return showDevTools ? XStateInspector : () => null;
}
