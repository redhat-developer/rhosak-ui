import { useUpdateKafkaMutation, useUserAccounts } from "consoledot-api/src";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { ChangeKafkaOwnerProps } from "ui";
import { ChangeKafkaOwner } from "ui";
import { useAlerts } from "../../../useAlerts";

import type { ControlPlaneNavigationProps } from "../routesConsts";
import { useControlPlaneGate } from "../useControlPlaneGate";

export const ChangeOwnerRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const history = useHistory();

  const { instance } = useControlPlaneGate();
  const { data: accounts } = useUserAccounts({});
  const updateInstance = useUpdateKafkaMutation();

  const { addAlert } = useAlerts();

  const onCancel = useCallback(() => {
    history.push(instancesHref);
  }, [history, instancesHref]);

  const onConfirm = useCallback(
    (newOwner: string) => {
      updateInstance.mutate(
        {
          id: instance.id,
          updates: { owner: newOwner },
        },
        {
          onSuccess: () => {
            history.replace(instancesHref);
            addAlert(
              "success",
              "Kafka instance owner changed",
              true,
              "change-owner-success",
              `${newOwner} is now the owner of the ${instance.name} Kafka instance.`
            );
          },
        }
      );
    },
    [
      addAlert,
      history,
      instance.id,
      instance.name,
      instancesHref,
      updateInstance,
    ]
  );

  const savingState = ((): ChangeKafkaOwnerProps["savingState"] => {
    if (updateInstance.isLoading) return "saving";
    if (updateInstance.isError) {
      return updateInstance.error.type === "invalid-user"
        ? "invalid-user"
        : "unknown-error";
    }
    return "idle";
  })();

  return (
    <ChangeKafkaOwner
      currentOwner={instance.owner}
      accounts={accounts?.accounts.map((a) => ({
        id: a.username,
        displayName: a.displayName,
      }))}
      onConfirm={onConfirm}
      onCancel={onCancel}
      savingState={savingState}
    />
  );
};
