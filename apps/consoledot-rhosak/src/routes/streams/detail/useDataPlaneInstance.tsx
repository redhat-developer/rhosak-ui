import { useKafkaInstance } from "consoledot-api";
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import type { DataPlaneRouteParams } from "../routes";
import { DataPlaneRoutePath } from "../routes";

export function useDataPlaneInstance(instancesHref: string) {
  const history = useHistory();

  const match = useRouteMatch<DataPlaneRouteParams>(DataPlaneRoutePath);

  if (!match) {
    throw Error("useDataPlaneInstance used outside the expected route");
  }
  const { data: instance, isError } = useKafkaInstance(match.params.id);

  useEffect(() => {
    if (isError) {
      history.replace(instancesHref);
    }
  }, [history, instancesHref, isError]);

  return { instance, match };
}
