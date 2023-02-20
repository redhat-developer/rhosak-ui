import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import { EditPermissions } from "ui";
import { addNotification } from "@redhat-cloud-services/frontend-components-notifications";
import { useDispatch } from "react-redux";
import {
  useDeletePermissionsMutation,
  useUpdatePermissionsMutation,
} from "consoledot-api";
import { usePermissionsGate } from "../usePermissionsGate";
import { useHistory } from "react-router-dom";
import type { AclBinding } from "@rhoas/kafka-instance-sdk";
import type { DataPlanePermissionsNavigationProps } from "../routesConsts";

export const EditPermissionsRoute: VoidFunctionComponent<
  DataPlanePermissionsNavigationProps
> = ({ managePermissionsHref }) => {
  const { instance, match, topics, consumerGroups, acls } =
    usePermissionsGate();

  const dispatch = useDispatch();

  const consumerGroupsList = consumerGroups.groups.map(
    (consumer) => consumer.groupId
  );
  const topicsList = topics.topics.map((topic) => topic.name);
  const { mutateAsync } = useDeletePermissionsMutation();
  const updatePermissions = useUpdatePermissionsMutation();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
                //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                history.push(managePermissionsHref(instance.id));
              },
              onError: (_, message) => {
                dispatch(
                  addNotification({
                    variant: "danger",
                    title: message,
                    dismissable: true,
                    id: "save-error",
                  })
                );
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
              dispatch(
                addNotification({
                  variant: "danger",
                  title: message,
                  dismissable: true,
                  id: "delete-error",
                })
              );
            },
            onSuccess: () => {
              //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
              history.push(managePermissionsHref(instance.id));
            },
          });
        });
      }
    },
    [
      dispatch,
      history,
      instance.adminUrl,
      instance.id,
      managePermissionsHref,
      mutateAsync,
      updatePermissions,
    ]
  );

  const existingAcls: AclBinding[] = acls.groups.map((acl) => {
    return {
      resourceName: acl.resource.resourceName,
      patternType: acl.resource.patternType,
      permission: acl.permission.permission,
      operation: acl.permission.operation,
      principal: acl.account,
      resourceType: acl.resource.resourceType,
    };
  });

  const onClose = useCallback(() => {
    //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(managePermissionsHref(instance.id));
  }, [history, instance.id, managePermissionsHref]);

  return (
    <EditPermissions
      onCancel={onClose}
      kafkaName={instance.name}
      onSave={onSaveAcls}
      topicsList={topicsList}
      consumerGroupsList={consumerGroupsList}
      selectedAccount={match.params.selectedAccount}
      acls={existingAcls}
    />
  );
};
