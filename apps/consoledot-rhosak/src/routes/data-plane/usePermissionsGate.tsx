import {
  useUserAccounts,
  useAcls,
  useServiceAccounts,
  useConsumerGroups,
  useTopics,
} from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import { DataPlanePermissionsRoutePath } from "./routesConsts";
import type { DataPlanePermissionsRouteParams } from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function usePermissionsGate() {
  const { instance } = useDataPlaneGate();
  const match = useRouteMatch<DataPlanePermissionsRouteParams>(
    DataPlanePermissionsRoutePath
  );
  if (!match) {
    throw Error("useEditPermissionsGate used outside the expected route");
  }
  const { data: accounts } = useUserAccounts({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });

  const { data: serviceAccounts } = useServiceAccounts({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });

  const { data: acls } = useAcls({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });

  const { data: topics } = useTopics({
    id: instance.id,
    adminUrl: instance.adminUrl,
    plan: instance.plan,
  });

  const { data: consumerGroups } = useConsumerGroups({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });

  return {
    instance,
    accounts: accounts,
    acls: acls,
    topics: topics,
    consumerGroups: consumerGroups,
    serviceAccounts: serviceAccounts,
    match,
  };
}
