import type { AclsApi } from "@rhoas/kafka-instance-sdk";
import type { Permissions } from "../../../ui";

export type FetchPermissionsParams = {
  getAcls: AclsApi["getAcls"];
  page?: number;
  perPage?: number;
};

export async function fetchPermissions({
  getAcls,
  page,
  perPage,
}: FetchPermissionsParams): Promise<{
  groups: Permissions[];
  count: number;
}> {
  const response = await getAcls(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    page,
    perPage
  );
  const groups = (response.data.items || []).map<Permissions>((t) => ({
    account: t.principal || "",
    permission: { permission: t.permission, operation: t.operation },
    resource: {
      resourceName: t.resourceName,
      patternType: t.patternType,
      resourceType: t.resourceType,
    },
  }));
  const count = response.data.total;
  return { count, groups };
}
