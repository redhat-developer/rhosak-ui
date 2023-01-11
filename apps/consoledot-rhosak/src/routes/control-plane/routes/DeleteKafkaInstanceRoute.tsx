import { useDeleteKafkaMutation } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { DeleteKafkaInstance } from "ui";
import { ReadyStatuses } from "ui-models/src/models/kafka";
import type { ControlPlaneNavigationProps } from "../routesConsts";
import { useControlPlaneGate } from "../useControlPlaneGate";

export const DeleteKafkaInstanceRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const history = useHistory();

  const { instance } = useControlPlaneGate();
  const { mutateAsync, isLoading: isDeleting } = useDeleteKafkaMutation();

  const onCancel = useCallback(() => {
    history.push(instancesHref);
  }, [history, instancesHref]);

  const onDelete = useCallback(() => {
    void mutateAsync({
      id: instance.id,
      onError: () => {
        // TODO: alert
      },
      onSuccess: () => {
        history.replace(instancesHref);
      },
    });
  }, [mutateAsync, history, instance?.id, instancesHref]);

  return (
    <DeleteKafkaInstance
      isModalOpen={true}
      isDeleting={isDeleting}
      onCancel={onCancel}
      onDelete={onDelete}
      instanceName={
        ReadyStatuses.includes(instance.status) ? instance.name : undefined
      }
      appendTo={() =>
        (document.getElementById("chrome-app-render-root") as HTMLElement) ||
        document.body
      }
    />
  );
};
