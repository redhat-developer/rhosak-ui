import { useUpdateKafkaMutation } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type { SettingsProps } from "ui";
import { Settings as SettingsComp } from "ui";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import { useAlerts } from "../../../useAlerts";

export const SettingsRoute: VoidFunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const { instance } = useDataPlaneGate();
  const updateInstance = useUpdateKafkaMutation();

  const { addAlert } = useAlerts();

  const onSubmitReAuthentication = useCallback<
    SettingsProps["onSubmitReAuthentication"]
  >(
    async (reauthenticationEnabled) => {
      try {
        await updateInstance.mutateAsync({
          id: instance.id,
          updates: { reauthentication_enabled: reauthenticationEnabled },
        });
        const status = reauthenticationEnabled ? "on" : "off";
        addAlert(
          "success",
          `Connection re-authentication turned ${status} `,
          true,
          "reauthentication-enable-success"
        );
        return reauthenticationEnabled;
      } catch {
        addAlert(
          "danger",
          "Something went wrong",
          true,
          "reauthentication-enable-error",
          "We're unable to update connection re-authentication at this time. Try again later."
        );
        return instance.request.reauthentication_enabled;
      }
    },
    [
      addAlert,
      instance.id,
      instance.request.reauthentication_enabled,
      updateInstance,
    ]
  );
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"settings"}
      />
      <SettingsComp
        onSubmitReAuthentication={onSubmitReAuthentication}
        reauthenticationEnabled={instance.request.reauthentication_enabled}
      />
    </>
  );
};
