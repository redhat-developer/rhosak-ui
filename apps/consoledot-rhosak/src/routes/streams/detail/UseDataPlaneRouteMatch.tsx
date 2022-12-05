import { useRouteMatch } from "react-router-dom";
import type { DataPlaneRouteParams } from "../routes";
import { DataPlaneRoutePath } from "../routes";

export function useDataPlaneRouteMatch() {
  const match = useRouteMatch<DataPlaneRouteParams>(DataPlaneRoutePath);
  if (!match) {
    throw Error("useDataPlaneRouteMatch used outside the expected route");
  }

  return match;
}
