import type { FunctionComponent, VFC } from "react";
import { useTranslation } from "react-i18next";

import { Label, LabelGroup, Tooltip } from "@patternfly/react-core";

import type {
  Account,
  AclOperation,
  AclPatternType,
  AclPermissionType,
  AclResourceType,
} from "../types";
import { ResourceTypeLabel } from "./ResourceTypeLabel";
import { RemoveButton } from "@rhoas/app-services-ui-components";
import { InfoCircleIcon } from "@patternfly/react-icons";
import { PrincipalType } from "..";

export const DisplayResourceName: VFC<{ resourceType: AclResourceType }> = ({
  resourceType,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  switch (resourceType) {
    case "GROUP":
      return t("resourceTypes.consumer_group");
    case "TOPIC":
      return t("resourceTypes.topic");
    case "CLUSTER":
      return t("resourceTypes.kafka_instance");
    case "TRANSACTIONAL_ID":
      return t("resourceTypes.transactional_id");
  }
};

const PatternType: VFC<{ patternType: AclPatternType }> = ({ patternType }) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  if (patternType === "PREFIXED") {
    return t("pattern_type_prefixed");
  } else {
    return t("pattern_type_literal");
  }
};

export type ResourceCellProps = {
  resourceType: AclResourceType;
  patternType: AclPatternType;
  resourceName: string;
};

export const ResourceCell: FunctionComponent<ResourceCellProps> = ({
  resourceType,
  patternType,
  resourceName,
}) => {
  if (resourceType === "CLUSTER") {
    return (
      <>
        <ResourceTypeLabel variant={resourceType} />{" "}
        <DisplayResourceName resourceType={resourceType} />
      </>
    );
  }

  return (
    <>
      <ResourceTypeLabel variant={resourceType} />{" "}
      <DisplayResourceName resourceType={resourceType} />{" "}
      <PatternType patternType={patternType} /> "{resourceName}"
    </>
  );
};

export type PermissionOperationCellProps = {
  permission: AclPermissionType;
  operation: AclOperation | AclOperation[];
};

export const PermissionOperationCell: FunctionComponent<
  PermissionOperationCellProps
> = ({ permission, operation }) => {
  const { t } = useTranslation("manage-kafka-permissions");
  const permissions: { [key in AclPermissionType]: string } = {
    ALLOW: t("permissions.allow"),
    DENY: t("permissions.deny"),
  };
  const operations: { [key in AclOperation]: string } = {
    ALL: t("operations.all"),
    READ: t("operations.read"),
    WRITE: t("operations.write"),
    CREATE: t("operations.create"),
    DELETE: t("operations.delete"),
    ALTER: t("operations.alter"),
    DESCRIBE: t("operations.describe"),
    DESCRIBE_CONFIGS: t("operations.describe_configs"),
    ALTER_CONFIGS: t("operations.alter_configs"),
  };
  return (
    <LabelGroup numLabels={4}>
      {permission && (
        <Label
          variant="outline"
          color={permission === "DENY" ? "red" : undefined}
        >
          {permissions[permission]}
        </Label>
      )}
      {Array.isArray(operation) ? (
        operation.map((value, key) => (
          <Label key={key} variant="outline">
            {operations[value]}
          </Label>
        ))
      ) : (
        <Label variant="outline">{operations[operation]}</Label>
      )}
    </LabelGroup>
  );
};

export type PrincipalCellProps = {
  isDeleteEnabled: boolean;
  isAllAccounts?: boolean;
  onRemoveAcl?: () => void;
  isReviewTable?: boolean;
  principal?: string;
  allAccounts?: Account;
};

export const PrincipalCell: VFC<PrincipalCellProps> = ({
  isDeleteEnabled,
  isAllAccounts,
  onRemoveAcl,
  isReviewTable = true,
  principal,
  allAccounts,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  const principalWithTooltip = () => {
    return allAccounts?.principalType == PrincipalType.ServiceAccount &&
      !isReviewTable ? (
      <Tooltip
        content={
          <div>
            Type: {allAccounts && allAccounts.principalType} <br />
          </div>
        }
      >
        <span tabIndex={0}>
          {" "}
          {principal?.split(":")[1]} <InfoCircleIcon color="grey" />
        </span>
      </Tooltip>
    ) : (
      !isReviewTable && (
        <Tooltip
          content={
            <div>
              Type: {allAccounts?.principalType} <br />
              Name: {allAccounts?.displayName} <br />
              Email: {allAccounts?.email}
            </div>
          }
        >
          <span tabIndex={0}>
            {principal?.split(":")[1]} <InfoCircleIcon color="grey" />
          </span>
        </Tooltip>
      )
    );
  };

  return (
    <div
      className={
        isReviewTable
          ? "pf-u-display-flex pf-u-justify-content-space-between pf-u-justify-content-flex-end-on-lg pf-u-align-items-center"
          : ""
      }
    >
      {isAllAccounts && isReviewTable ? (
        <Label variant="outline">{t("table.all_accounts")}</Label>
      ) : !isReviewTable && principal == "User:*" ? (
        <Label variant={"outline"}>{t("table.all_accounts")}</Label>
      ) : (
        principalWithTooltip()
      )}

      {isDeleteEnabled && onRemoveAcl != undefined && (
        <RemoveButton
          variant="link"
          tooltip={t("remove_permission_tooltip")}
          onClick={onRemoveAcl}
          ariaLabel={t("operations.delete")}
        />
      )}
    </div>
  );
};
