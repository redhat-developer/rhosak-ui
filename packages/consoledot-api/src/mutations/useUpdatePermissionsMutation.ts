import type { AclBinding } from "@rhoas/kafka-instance-sdk";
import { isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useUpdatePermissionsMutation() {
  const { acls } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function updatePermissionsPermissions(props: {
      instanceId: string;
      adminUrl: string;
      acl: AclBinding;
      onSuccess: () => void;
      onError: (code: string, message: string) => void;
    }) {
      const { adminUrl, acl, onSuccess, onError } = props;
      const api = acls(adminUrl);
      try {
        await api.createAcl({
          resourceName: acl.resourceName,
          resourceType: acl.resourceType,
          patternType: acl.patternType,
          permission: acl.permission,
          principal: acl.principal,
          operation: acl.operation,
        });
        onSuccess();
      } catch (error) {
        if (isServiceApiError(error)) {
          const message = error?.message;
          const { code } = error?.response?.data || {};

          onError(code || "?", message);
        }
      }
    },
    {
      onSuccess: (_, { adminUrl, instanceId }) => {
        void queryClient.invalidateQueries([
          kafkaQueries.instance._root({
            id: instanceId,
            adminUrl,
          }),
        ]);
      },
    }
  );
}
