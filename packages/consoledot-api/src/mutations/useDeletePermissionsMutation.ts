import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import type { AclFilter } from "../types";
import { useApi } from "../useApi";

export function useDeletePermissionsMutation() {
  const { acls } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function deletePermissions(props: {
      instanceId: string;
      adminUrl: string;
      acl: AclFilter;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const { adminUrl, acl, onSuccess, onError } = props;
      const api = acls(adminUrl);
      try {
        await api.deleteAcls(
          acl.resourceType,
          acl.resourceName,
          acl.patternType,
          acl.principal,
          acl.operation,
          acl.permissionType
        );
        onSuccess();
      } catch (error) {
        if (isServiceApiError(error)) {
          const message = error?.response?.data.reason || "";
          const { code } = error?.response?.data || {};

          onError(code || "?", message);
        }
      }
    },
    {
      onSuccess: (_, { adminUrl, instanceId }) => {
        void queryClient.invalidateQueries([
          kafkaQueries.instance.permissions({
            id: instanceId,
            adminUrl,
          }),
        ]);
      },
    }
  );
}
