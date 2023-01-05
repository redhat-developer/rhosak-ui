import { useTopic } from "consoledot-api";
import { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import type { DataPlaneTopicRouteParams } from "./routesConsts";
import { DataPlaneTopicRoutePath } from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function useTopicGate(
  instancesHref: string,
  instanceDetailsHref: (id: string) => string
) {
  const history = useHistory();
  const { instance } = useDataPlaneGate(instancesHref);
  const match = useRouteMatch<DataPlaneTopicRouteParams>(
    DataPlaneTopicRoutePath
  );

  if (!match) {
    throw Error("useDataPlaneGate used outside the expected route");
  }

  const { data: topic, isError } = useTopic({
    id: instance.id,
    adminUrl: instance.adminUrl,
    topicName: match.params.topicName,
    plan: instance.plan,
  });

  useEffect(() => {
    if (isError) {
      history.replace(instanceDetailsHref(instance.id));
    }
  }, [history, instance.id, instanceDetailsHref, instancesHref, isError]);

  return { instance, topic: topic as NonNullable<typeof topic>, match };
}
