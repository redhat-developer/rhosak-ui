import { usePaginationSearchParams } from "@rhoas/app-services-ui-components";
import { useAcls } from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import { DataPlanePermissionsTableRoutePath } from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function usePermissionsTableGate() {
  const { instance } = useDataPlaneGate();
  const { page, perPage } = usePaginationSearchParams();
  const match = useRouteMatch(DataPlanePermissionsTableRoutePath);
  if (!match) {
    throw Error("usePermissionsTableGate used outside the expected route");
  }
  const { data: acls } = useAcls(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
      page,
      perPage,
    },
    true
  );

  return {
    instance,
    acls: acls as NonNullable<typeof acls>,
  };
}
