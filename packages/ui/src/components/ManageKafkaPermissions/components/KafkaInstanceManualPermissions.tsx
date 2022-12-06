import { Tbody, Td, Tr } from "@patternfly/react-table";
import { RemoveButton } from "@rhoas/app-services-ui-components";
import { useTranslation } from "react-i18next";
import type { ResourceOperationValue } from "./ResourceOperation";
import { ResourceOperation } from "./ResourceOperation";
import type { ResourcePermissionValue } from "./ResourcePermission";
import { ResourcePermission } from "./ResourcePermission";
import type { ResourceTypeValue } from "./ResourceType";
import { ResourceType } from "./ResourceType";

export type KafkaInstanceManualPermissions = {
  resourceType: ResourceTypeValue | undefined;
  onChangeResourceType: (value: ResourceTypeValue | undefined) => void;
  submitted: boolean;
  resourcePermission: ResourcePermissionValue;
  onChangeResourcePermission: (value: ResourcePermissionValue) => void;
  resourceOperation: ResourceOperationValue | undefined;
  onChangeResourceOperation: (
    value: ResourceOperationValue | undefined
  ) => void;
  row: number;
  onDelete: (row: number) => void;
};

export const KafkaInstanceManualPermissions: React.FC<
  KafkaInstanceManualPermissions
> = ({
  resourceType,
  resourceOperation,
  resourcePermission,
  submitted,
  onChangeResourceOperation,
  onChangeResourcePermission,
  onChangeResourceType,
  row,
  onDelete,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  return (
    <Tbody>
      <Tr>
        <Td width={60}>
          <ResourceType
            value={resourceType}
            onChangeValue={onChangeResourceType}
            invalid={submitted && resourceType === undefined}
          />
        </Td>

        <Td />
        <Td />

        <Td>
          <ResourcePermission
            value={resourcePermission}
            onChangeValue={onChangeResourcePermission}
          />
        </Td>
        <Td>
          <ResourceOperation
            value={resourceOperation}
            onChangeValue={onChangeResourceOperation}
            resourceTypeOptions={[
              t("operations.alter"),
              t("operations.describe"),
            ]}
            invalid={submitted && resourceOperation === undefined}
          />
        </Td>
        <Td>
          <RemoveButton
            variant="link"
            onClick={() => onDelete(row)}
            tooltip={t("operations.delete")}
          />
        </Td>
      </Tr>
    </Tbody>
  );
};
