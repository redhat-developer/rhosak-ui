import { useKafka } from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import type { ControlPlaneRouteParams } from "./routesConsts";
import {
  ControlPlaneRoutePath,
  DedicatedControlPlaneRoutePath,
} from "./routesConsts";

export function useControlPlaneGate() {
  const standardMatch = useRouteMatch<ControlPlaneRouteParams>(
    ControlPlaneRoutePath
  );
  const enterpriseMatch = useRouteMatch<ControlPlaneRouteParams>(
    DedicatedControlPlaneRoutePath
  );
  const match = standardMatch || enterpriseMatch;
  if (!match) {
    throw Error("useControlPlaneGate used outside the expected route");
  }
  const { data: instance } = useKafka(match.params.id, true);
  return { instance: instance as NonNullable<typeof instance>, match };
}
