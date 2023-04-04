import type { AclBinding } from "@rhoas/kafka-instance-sdk";
import {
  useAcls,
  useConsumerGroups,
  useDeletePermissionsMutation,
  useTopics,
  useUpdatePermissionsMutation,
} from "consoledot-api/src";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { EditPermissions } from "ui";
import { useAlerts } from "../../../useAlerts";
import { ControlPlaneRouteRoot } from "../../control-plane/routesConsts";
import type {
  DataPlanePermissionsNavigationProps,
  DataPlanePermissionsRouteParams,
} from "../routesConsts";
import { DataPlanePermissionsRoutePath } from "../routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";

export const PermissionsEditRoute: VoidFunctionComponent<
  DataPlanePermissionsNavigationProps
> = ({ managePermissionsHref }) => {
  const { instance } = useDataPlaneGate();
  const { addAlert } = useAlerts();

  const standardMatch = useRouteMatch<DataPlanePermissionsRouteParams>(
    DataPlanePermissionsRoutePath(ControlPlaneRouteRoot)
  );
  const dedicatedMatch = useRouteMatch<DataPlanePermissionsRouteParams>(
    DataPlanePermissionsRoutePath(ControlPlaneRouteRoot)
  );
  const match = standardMatch || dedicatedMatch;
  if (!match) {
    throw Error("EditPermissions used outside the expected route");
  }

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

  const consumerGroupsList = consumerGroups?.groups.map(
    (consumer) => consumer.name
  );
  const topicsList = topics?.topics.map((topic) => topic.name);
  const { mutateAsync } = useDeletePermissionsMutation();
  const updatePermissions = useUpdatePermissionsMutation();

  const history = useHistory();

  const onSaveAcls = useCallback(
    (
      aclPermission: AclBinding[] | undefined,
      deletedPermissions: AclBinding[] | undefined
    ) => {
      if (aclPermission != undefined && aclPermission.length > 0) {
        aclPermission.map(
          (aclData) =>
            void updatePermissions.mutateAsync({
              instanceId: instance.id,
              adminUrl: instance?.adminUrl || "",
              acl: {
                patternType: aclData.patternType,
                permission: aclData.permission,
                principal: aclData.principal,
                operation: aclData.operation,
                resourceName: aclData.resourceName,
                resourceType: aclData.resourceType,
              },

              onSuccess: () => {
                history.push(managePermissionsHref(instance.id));
              },
              onError: (_, message) => {
                addAlert("danger", message, true, "save-error");
              },
            })
        );
      }

      if (deletedPermissions != undefined && deletedPermissions.length > 0) {
        deletedPermissions.map((aclToDelete) => {
          void mutateAsync({
            instanceId: instance.id,
            adminUrl: instance.adminUrl || "",
            acl: {
              patternType: aclToDelete.patternType,
              permissionType: aclToDelete.permission,
              principal: aclToDelete.principal,
              resourceName: aclToDelete.resourceName,
              operation: aclToDelete.operation,
              resourceType: aclToDelete.resourceType,
            },
            onError: (_, message) => {
              addAlert("danger", message, true, "delete-error");
            },
            onSuccess: () => {
              history.push(managePermissionsHref(instance.id));
            },
          });
        });
      }
    },
    [
      addAlert,
      history,
      instance.adminUrl,
      instance.id,
      managePermissionsHref,
      mutateAsync,
      updatePermissions,
    ]
  );

  const existingAcls: AclBinding[] | undefined = acls?.groups.map((acl) => {
    return {
      resourceName: acl.resource.resourceName,
      patternType: acl.resource.patternType,
      permission: acl.permission.permission,
      operation: acl.permission.operation,
      principal: acl.account,
      resourceType: acl.resource.resourceType,
    };
  });

  const aclsForSelectedAccount = existingAcls?.filter(
    (value) =>
      value.principal == `User:${match.params.selectedAccount}` ||
      value.principal == "User:*"
  );

  const onClose = useCallback(() => {
    history.push(managePermissionsHref(instance.id));
  }, [history, instance.id, managePermissionsHref]);

  return (
    <EditPermissions
      onCancel={onClose}
      kafkaName={instance.name}
      onSave={onSaveAcls}
      topicsList={topicsList || []}
      consumerGroupsList={consumerGroupsList || []}
      selectedAccount={
        match.params.selectedAccount == "all-accounts"
          ? "All accounts"
          : match.params.selectedAccount
      }
      acls={aclsForSelectedAccount || []}
    />
  );
};
