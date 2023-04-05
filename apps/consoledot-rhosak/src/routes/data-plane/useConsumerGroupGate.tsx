import { useConsumerGroup } from "consoledot-api/src";
import { useRouteMatch } from "react-router-dom";
import { ControlPlaneRouteRoot } from "../control-plane/routesConsts";
import type { DataPlaneConsumerGroupRouteParams } from "./routesConsts";
import { DataPlaneConsumerGroupRoutePath } from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function useConsumerGroupGate() {
  const { instance } = useDataPlaneGate();
  const match = useRouteMatch<DataPlaneConsumerGroupRouteParams>(
    DataPlaneConsumerGroupRoutePath(ControlPlaneRouteRoot)
  );
  if (!match) {
    throw Error("useConsumerGroupGate used outside the expected route");
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
  };
}
