import { useConsumerGroup } from "consoledot-api/src";
import { useRouteMatch } from "react-router-dom";
import {
  ControlPlaneRouteRoot,
  DedicatedControlPlaneRouteRoot,
} from "../control-plane/routesConsts";
import type { DataPlaneTopicConsumerRouteParams } from "./routesConsts";
import { DataPlaneTopicConsumerGroupRoutePath } from "./routesConsts";
import { useTopicGate } from "./useTopicGate";

export function useTopicConsumerGroupGate() {
  const { instance, topic } = useTopicGate();
  const standardMatch = useRouteMatch<DataPlaneTopicConsumerRouteParams>(
    DataPlaneTopicConsumerGroupRoutePath(ControlPlaneRouteRoot)
  );
  const dedicatedMatch = useRouteMatch<DataPlaneTopicConsumerRouteParams>(
    DataPlaneTopicConsumerGroupRoutePath(DedicatedControlPlaneRouteRoot)
  );
  const match = standardMatch || dedicatedMatch;
  if (!match) {
    throw Error("useTopicConsumerGroupGate used outside the expected route");
  }
  const { data: consumerGroup } = useConsumerGroup(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
      consumerGroupId: match.params.consumerGroupId,
    },
    true
  );

  return {
    instance,
    consumerGroup: consumerGroup as NonNullable<typeof consumerGroup>,
    match,
    topic,
  };
}
