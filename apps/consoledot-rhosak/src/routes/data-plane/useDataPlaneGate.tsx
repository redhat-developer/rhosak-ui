import { useKafka } from "consoledot-api";
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import type { DataPlaneRouteParams } from "./routesConsts";
import { DataPlaneRoutePath } from "./routesConsts";

export function useDataPlaneGate(instancesHref: string) {
  const history = useHistory();

  const match = useRouteMatch<DataPlaneRouteParams>(DataPlaneRoutePath);

  if (!match) {
    throw Error("useDataPlaneGate used outside the expected route");
  }
  const { data: instance, isError } = useKafka(match.params.id);

  useEffect(() => {
    if (isError) {
      history.replace(instancesHref);
    }
  }, [history, instancesHref, isError]);

  return { instance: instance as NonNullable<typeof instance>, match };
}
