import { useTopic } from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import type { DataPlaneTopicRouteParams } from "./routesConsts";
import {
  DataPlaneTopicRoutePath,
  DedicatedDataPlaneTopicRoutePath,
} from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function useTopicGate() {
  const { instance } = useDataPlaneGate();
  const standardMatch = useRouteMatch<DataPlaneTopicRouteParams>(
    DataPlaneTopicRoutePath
  );
  const dedicatedMatch = useRouteMatch<DataPlaneTopicRouteParams>(
    DedicatedDataPlaneTopicRoutePath
  );
  const match = standardMatch || dedicatedMatch;
  if (!match) {
    throw Error("useDataPlaneGate used outside the expected route");
  }
  const { data: topic } = useTopic(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
      topicName: match.params.topicName,
      plan: instance.plan,
    },
    true
  );

  return {
    instance,
    topic: topic as NonNullable<typeof topic>,
    match,
  };
}
