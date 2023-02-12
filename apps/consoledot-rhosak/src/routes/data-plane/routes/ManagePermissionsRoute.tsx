import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import type { Account } from "ui";
import { PrincipalType } from "ui";
import { ManageKafkaPermissions } from "ui";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import {
  useAcls,
  useDeletePermissionsMutation,
  useServiceAccounts,
  useUserAccounts,
  useTopics,
  useConsumerGroups,
  useUpdatePermissionsMutation,
} from "consoledot-api";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { useHistory } from "react-router-dom";
import type { AclBinding } from "@rhoas/kafka-instance-sdk";
import type { DataPlanePermissionsNavigationProps } from "../routesConsts";

export const ManagePermissionsRoute: VoidFunctionComponent<
  DataPlanePermissionsNavigationProps
> = ({ instancesHref, managePermissionsHref }) => {
  const { instance } = useDataPlaneGate();
  const { data: accounts } = useUserAccounts({});
  const { data: serviceAccounts } = useServiceAccounts({});
  const userAccounts: Account[] | undefined = accounts?.accounts.map(
    (userAccount) => {
      return {
        displayName: userAccount.displayName,
        id: userAccount.username,
        principalType: PrincipalType.UserAccount,
      };
    }
  );

  const serviceAccountList: Account[] | undefined =
    serviceAccounts?.serviceAccounts.map((userAccount) => {
      return {
        displayName: userAccount.displayName,
        id: userAccount.id,
        principalType: PrincipalType.ServiceAccount,
      };
    });

  const allAccounts =
    serviceAccountList != undefined &&
    userAccounts != undefined &&
    serviceAccountList.concat(userAccounts);

  const topicData = useTopics({
    id: instance.id,
    adminUrl: instance.adminUrl,
    plan: instance.plan,
  });
  const consumerGroupData = useConsumerGroups({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });
  const consumerGroupsList = consumerGroupData.data?.groups.map(
    (consumer) => consumer.groupId
  );
  const topicsList = topicData.data?.topics.map((topic) => topic.name);
  const { mutateAsync } = useDeletePermissionsMutation();
  const updatePermissions = useUpdatePermissionsMutation();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const { data } = useAcls({
    id: instance.id,
    adminUrl: instance.adminUrl,
  });

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
                history.replace(managePermissionsHref(instance.id));
              },
              onError: () => {
                //To-Do
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
            onError: () => {
              //To-Do
            },
            onSuccess: () => {
              //To-Do
            },
          });
        });
      }
    },
    [
      history,
      instance.adminUrl,
      instance.id,
      managePermissionsHref,
      mutateAsync,
      updatePermissions,
    ]
  );

  const existingAcls: AclBinding[] | undefined = data?.groups.map((acl) => {
    return {
      resourceName: acl.resource.resourceName,
      patternType: acl.resource.patternType,
      permission: acl.permission.permission,
      operation: acl.permission.operation,
      principal: acl.account,
      resourceType: acl.resource.resourceType,
    };
  });

  const onCancel = useCallback(() => {
    //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instancesHref);
  }, [history, instancesHref]);

  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"permissions"}
      />
      <ManageKafkaPermissions
        accounts={allAccounts || []}
        onCancel={onCancel}
        kafkaName={instance.name}
        onSave={onSaveAcls}
        acls={existingAcls}
        topicsList={topicsList || []}
        consumerGroupsList={consumerGroupsList || []}
      />
    </>
  );
};
