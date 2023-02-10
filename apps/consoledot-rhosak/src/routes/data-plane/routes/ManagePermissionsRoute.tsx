import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import type { Account } from "ui";
import { PrincipalType } from "ui";
import { ManageKafkaPermissions } from "ui";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import {
  useAcls,
  useDeletePermissionsMutation,
  //useServiceAccounts,
  useUserAccounts,
  useTopics,
  useConsumerGroups,
  useUpdatePermissionsMutation,
} from "consoledot-api";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { useHistory } from "react-router-dom";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import type { AclBinding } from "@rhoas/kafka-instance-sdk";
import { DataPlaneRoutePath } from "../routesConsts";

export const ManagePermissionsRoute: VoidFunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const { instance } = useDataPlaneGate();
  const { data: accounts } = useUserAccounts({});
  const userAccounts: Account[] | undefined = accounts?.accounts.map(
    (userAccount) => {
      return {
        displayName: userAccount.displayName,
        id: userAccount.username,
        principalType: PrincipalType.ServiceAccount,
      };
    }
  );
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
  //To-Do :Get service accounts
  //const serviceAccounts = useServiceAccounts({});
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
      aclPermission?.map(
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
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
              //history.replace(instancesHref);
            },
            onError: () => {
              //
            },
          })
      );
      deletedPermissions?.map((aclToDelete) => {
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
            // TODO: alert
          },
          onSuccess: () => {
            // No action
          },
        });
      });
    },
    [instance.adminUrl, instance.id, mutateAsync, updatePermissions]
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(`${DataPlaneRoutePath}/acls`);
  }, [history]);

  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"permissions"}
      />
      <ManageKafkaPermissions
        accounts={userAccounts || []}
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
