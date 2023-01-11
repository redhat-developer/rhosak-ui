import { useKafka } from "consoledot-api";
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import type { ControlPlaneRouteParams } from "./routesConsts";
import { ControlPlaneRoutePath } from "./routesConsts";

export function useControlPlaneGate(instancesHref: string) {
  const history = useHistory();

  const match = useRouteMatch<ControlPlaneRouteParams>(ControlPlaneRoutePath);

  if (!match) {
    throw Error("useControlPlaneGate used outside the expected route");
  }
  const { data: instance, isError } = useKafka(match.params.id, true);

  useEffect(() => {
    if (isError || match.params.id === undefined) {
      history.replace(instancesHref);
    }
  }, [history, instancesHref, isError, match.params.id]);

  return { instance: instance as NonNullable<typeof instance>, match };
}
