import { DropdownGroup } from "@patternfly/react-core";
import { ActionsColumn } from "@patternfly/react-table";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export type KafkaInstanceActionsProps = {
  onDetails: () => void;
  onConnection: () => void;
  canChangeOwner: boolean;
  onChangeOwner: () => void;
  canDelete: boolean;
  onDelete: () => void;
};

export const KafkaInstanceActions: VoidFunctionComponent<
  KafkaInstanceActionsProps
> = ({
  onDetails,
  onConnection,
  canChangeOwner,
  onChangeOwner,
  canDelete,
  onDelete,
}) => {
  const { t } = useTranslation("kafka");
  return (
    <ActionsColumn
      items={[
        {
          customChild: (
            <DropdownGroup
              label={t("table.actions.view-instance-information")}
            />
          ),
        },
        {
          title: t("table.actions.details"),
          onClick: onDetails,
        },
        {
          title: t("table.actions.connection"),
          onClick: onConnection,
        },
        {
          isSeparator: true,
        },
        {
          title: t("table.actions.change-owner"),
          ...(!canChangeOwner
            ? {
                isDisabled: true,
                tooltipProps: {
                  position: "left",
                  content: t("kafka:no_permission_to_change_owner"),
                },
                tooltip: true,
                style: {
                  pointerEvents: "auto",
                  cursor: "default",
                },
              }
            : {
                onClick: onChangeOwner,
              }),
        },
        {
          title: t("table.actions.delete"),
          ...(!canDelete
            ? {
                isDisabled: true,
                tooltipProps: {
                  position: "left",
                  content: t("kafka:no_permission_to_delete_kafka"),
                },
                tooltip: true,
                style: {
                  pointerEvents: "auto",
                  cursor: "default",
                },
              }
            : {
                onClick: onDelete,
              }),
        },
      ]}
    />
  );
};
