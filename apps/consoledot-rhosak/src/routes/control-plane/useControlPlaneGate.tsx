import { useKafka } from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import type { ControlPlaneRouteParams } from "./routesConsts";
import { ControlPlaneRoutePath } from "./routesConsts";

export function useControlPlaneGate() {
  const match = useRouteMatch<ControlPlaneRouteParams>(ControlPlaneRoutePath);
  if (!match) {
    throw Error("useControlPlaneGate used outside the expected route");
  }
  const { data: instance } = useKafka(match.params.id, true);
  return { instance: instance as NonNullable<typeof instance>, match };
}
