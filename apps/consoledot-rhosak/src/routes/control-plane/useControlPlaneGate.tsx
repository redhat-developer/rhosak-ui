import { useKafka } from "consoledot-api/src";
import { useRouteMatch } from "react-router-dom";
import type { ControlPlaneRouteParams } from "./routesConsts";
import { ControlPlaneRouteMatch } from "./routesConsts";

export function useControlPlaneGate() {
  const match = useRouteMatch<ControlPlaneRouteParams>(ControlPlaneRouteMatch);
  if (!match) {
    throw Error("useControlPlaneGate used outside the expected route");
  }
  const { data: instance } = useKafka(match.params.id, true);
  return { instance: instance as NonNullable<typeof instance>, match };
}
