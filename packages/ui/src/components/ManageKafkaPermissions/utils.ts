import type { ResourceOperationValue } from "./components/ResourceOperation";
import type { ResourceTypeValue } from "./components/ResourceType";
import type { AclBinding } from "@rhoas/kafka-instance-sdk";
import { AclResourceType } from "@rhoas/kafka-instance-sdk";
import type { AddAclType } from "./types";

export const transformPermissions = (
  transformAclData: AclBinding[],
  newAcls?: AddAclType[],
  selectedAccount?: string
) => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const selectedAccountName = `User:${selectedAccount}`;
  newAcls?.map((value) => {
    switch (value.type) {
      case "manual": {
        transformAclData.push({
          resourceName:
            value.resourceType == "kafka-instance"
              ? "kafka-cluster"
              : value.resourceName
              ? value.resourceName
              : "",
          resourceType: transformResourceType(value.resourceType),
          patternType: value.resourcePrefix == "Is" ? "LITERAL" : "PREFIXED",
          operation: transformResourceOperation(value.resourceOperation),
          permission: value.resourcePermission == "allow" ? "ALLOW" : "DENY",
          principal:
            selectedAccount == "All accounts" ? `User:*` : selectedAccountName,
        });
        break;
      }
      case "manage-access":
        {
          transformAclData.push({
            resourceName: "kafka-cluster",
            resourceType: "CLUSTER",
            patternType: "LITERAL",
            operation: "ALTER",
            permission: "ALLOW",
            principal:
              selectedAccount == "All accounts"
                ? `User:*`
                : selectedAccountName,
          });
        }
        break;
      case "consume-topic":
        {
          transformAclData.push(
            {
              resourceName: value.topicResourceName || "",
              resourceType: "TOPIC",
              patternType:
                value.topicResourcePrefixRule == "Is" ? "LITERAL" : "PREFIXED",
              operation: "READ",
              permission: "ALLOW",
              principal:
                selectedAccount == "All accounts"
                  ? `User:*`
                  : selectedAccountName,
            },
            {
              resourceName: value.topicResourceName || "",
              resourceType: "TOPIC",
              patternType:
                value.topicResourcePrefixRule == "Is" ? "LITERAL" : "PREFIXED",
              operation: "DESCRIBE",
              permission: "ALLOW",
              principal:
                selectedAccount == "All accounts"
                  ? `User:*`
                  : selectedAccountName,
            },
            {
              resourceName: value.consumerResourceName || "",
              resourceType: "GROUP",
              patternType:
                value.consumerResourcePrefixRule == "Is"
                  ? "LITERAL"
                  : "PREFIXED",
              operation: "READ",
              permission: "ALLOW",
              principal:
                selectedAccount == "All accounts"
                  ? `User:*`
                  : selectedAccountName,
            }
          );
        }
        break;
      case "produce-topic": {
        transformAclData.push(
          {
            resourceName: value.resourceNameValue || "",
            resourceType: "TOPIC",
            patternType: value.prefixRuleValue == "Is" ? "LITERAL" : "PREFIXED",
            operation: "WRITE",
            permission: "ALLOW",
            principal:
              selectedAccount == "All accounts"
                ? `User:*`
                : selectedAccountName,
          },
          {
            resourceName: value.resourceNameValue || "",
            resourceType: "TOPIC",
            patternType: value.prefixRuleValue == "Is" ? "LITERAL" : "PREFIXED",
            operation: "CREATE",
            permission: "ALLOW",
            principal:
              selectedAccount == "All accounts"
                ? `User:*`
                : selectedAccountName,
          },
          {
            resourceName: value.resourceNameValue || "",
            resourceType: "TOPIC",
            patternType: value.prefixRuleValue == "Is" ? "LITERAL" : "PREFIXED",
            operation: "DESCRIBE",
            permission: "ALLOW",
            principal:
              selectedAccount == "All accounts"
                ? `User:*`
                : selectedAccountName,
          }
        );
      }
    }
  });
};

export const transformResourceType = (value: ResourceTypeValue | undefined) => {
  switch (value) {
    case "consumer-group":
      return AclResourceType.Group;
    case "kafka-instance":
      return AclResourceType.Cluster;
    case "topic":
      return AclResourceType.Topic;
    default:
      return AclResourceType.TransactionalId;
  }
};
export const transformResourceOperation = (
  value: ResourceOperationValue | undefined
) => {
  switch (value) {
    case "All":
      return "ALL";
    case "Alter":
      return "ALTER";
    case "Alter configs":
      return "ALTER_CONFIGS";
    case "Create":
      return "CREATE";
    case "Delete":
      return "DELETE";
    case "Describe":
      return "DESCRIBE";
    case "Describe configs":
      return "DESCRIBE_CONFIGS";
    case "Read":
      return "READ";
    default:
      return "WRITE";
  }
};
