import { useTopic } from "consoledot-api/src";
import { useRouteMatch } from "react-router-dom";
import type { DataPlaneTopicRouteParams } from "./routesConsts";
import { DataPlaneTopicRoutePath } from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function useTopicGate() {
  const { instance } = useDataPlaneGate();
  const match = useRouteMatch<DataPlaneTopicRouteParams>(
    DataPlaneTopicRoutePath
  );
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
