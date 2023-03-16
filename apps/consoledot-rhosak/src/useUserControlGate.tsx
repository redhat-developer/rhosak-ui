import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useUser } from "consoledot-api/src";
import { useCallback } from "react";

export function useUserControlGate() {
  const { auth } = useChrome();
  const getUser = useCallback(async () => {
    const user = await auth.getUser();
    const username = user?.identity?.user?.username;
    const isOrgAdmin = user?.identity?.user?.is_org_admin;
    return {
      username,
      isOrgAdmin,
    };
  }, [auth]);
  const { data: userData } = useUser({ getUser, suspense: true });
  return { userData: userData as NonNullable<typeof userData> };
}
