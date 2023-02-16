import { useKafka } from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import type { DataPlaneRouteParams } from "./routesConsts";
import {
  DataPlaneRoutePath,
  DedicatedDataPlaneRoutePath,
} from "./routesConsts";

export function useDataPlaneGate() {
  const standardMatch = useRouteMatch<DataPlaneRouteParams>(DataPlaneRoutePath);
  const dedicatedMatch = useRouteMatch<DataPlaneRouteParams>(
    DedicatedDataPlaneRoutePath
  );
  const match = standardMatch || dedicatedMatch;
  if (!match) {
    throw Error("useDataPlaneGate used outside the expected route");
  }
  const { data: instance } = useKafka(match.params.id, true);
  return { instance: instance as NonNullable<typeof instance>, match };
}
