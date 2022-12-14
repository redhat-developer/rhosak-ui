import type { AppServicesApi } from "@rhoas/account-management-sdk";

export async function fetchOrganization(
  api: AppServicesApi["apiAccountsMgmtV1CurrentAccountGet"]
) {
  const account = await api();
  const orgId = account?.data?.organization?.id;
  return orgId;
}
