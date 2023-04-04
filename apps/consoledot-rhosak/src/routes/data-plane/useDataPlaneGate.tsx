import { useKafka } from "consoledot-api/src";
import { useRouteMatch } from "react-router-dom";
import { ControlPlaneRouteRoot } from "../control-plane/routesConsts";
import type { DataPlaneRouteParams } from "./routesConsts";
import { DataPlaneRoutePath } from "./routesConsts";

export function useDataPlaneGate() {
  const standardMatch = useRouteMatch<DataPlaneRouteParams>(
    DataPlaneRoutePath(ControlPlaneRouteRoot)
  );
  const dedicatedMatch = useRouteMatch<DataPlaneRouteParams>(
    DataPlaneRoutePath(ControlPlaneRouteRoot)
  );
  const match = standardMatch || dedicatedMatch;
  if (!match) {
    throw Error("useDataPlaneGate used outside the expected route");
  }
  const { data: instance } = useKafka(match.params.id, true);
  return { instance: instance as NonNullable<typeof instance>, match };
}
