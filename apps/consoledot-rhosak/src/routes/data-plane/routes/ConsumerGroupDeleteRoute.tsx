import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { DeleteConsumerGroup } from "ui";
import { useDeleteConsumerGroupMutation } from "consoledot-api";
import type { DataPlaneConsumerGroupNavigationsProps } from "../routesConsts";
import { useConsumerGroupGate } from "../useConsumerGroupGate";
import { useAlerts } from "../../../useAlerts";

export const ConsumerGroupDeleteRoute: VoidFunctionComponent<
  DataPlaneConsumerGroupNavigationsProps
> = ({ instanceConsumerGroupsHref }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const { addAlert } = useAlerts();

  const { instance, consumerGroup } = useConsumerGroupGate();

  const { mutateAsync } = useDeleteConsumerGroupMutation();

  const onCancel = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instanceConsumerGroupsHref(instance.id));
  }, [history, instance.id, instanceConsumerGroupsHref]);

  const onDelete = useCallback(() => {
    void mutateAsync({
      instanceId: instance.id,
      adminUrl: instance.adminUrl!,
      consumerGroupId: consumerGroup.name,
      onError: (_, message) => {
        addAlert("danger", message, true, "delete-consumer-group-error");
      },
      onSuccess: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        history.replace(instanceConsumerGroupsHref(instance.id));
        addAlert(
          "success",
          `Successfully deleted consumer group ${consumerGroup.name}`,
          true,
          "delete-consumer-group-success"
        );
      },
    });
  }, [
    mutateAsync,
    instance.id,
    instance.adminUrl,
    consumerGroup.name,
    addAlert,
    history,
    instanceConsumerGroupsHref,
  ]);

  return (
    <DeleteConsumerGroup
      isModalOpen={true}
      onClose={onCancel}
      onDeleteConsumer={onDelete}
      state={consumerGroup.state}
      consumerName={consumerGroup.name}
      appendTo={() =>
        (document.getElementById("chrome-app-render-root") as HTMLElement) ||
        document.body
      }
    />
  );
};
