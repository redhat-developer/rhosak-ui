import { useKafka } from "consoledot-api/src";
import { useRouteMatch } from "react-router-dom";
import type { ControlPlaneRouteParams } from "./routesConsts";
import {
  ControlPlaneRoutePath,
  DedicatedControlPlaneRouteMatch,
} from "./routesConsts";

export function useControlPlaneGate() {
  const standardMatch = useRouteMatch<ControlPlaneRouteParams>(
    ControlPlaneRoutePath
  );
  const enterpriseMatch = useRouteMatch<ControlPlaneRouteParams>(
    DedicatedControlPlaneRouteMatch
  );
  const match = standardMatch || enterpriseMatch;
  if (!match) {
    throw Error("useControlPlaneGate used outside the expected route");
  }
  const { data: instance } = useKafka(match.params.id, true);
  return { instance: instance as NonNullable<typeof instance>, match };
}
