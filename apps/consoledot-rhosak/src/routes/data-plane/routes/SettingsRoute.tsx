import { useUpdateKafkaMutation } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type { SettingsProps } from "ui";
import { Settings as SettingsComp } from "ui";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const SettingsRoute: VoidFunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const { instance } = useDataPlaneGate();
  const updateInstance = useUpdateKafkaMutation();

  const onSubmitReAuthentication = useCallback<
    SettingsProps["onSubmitReAuthentication"]
  >(
    async (reauthenticationEnabled) => {
      try {
        await updateInstance.mutateAsync({
          id: instance.id,
          updates: { reauthentication_enabled: reauthenticationEnabled },
        });
        return reauthenticationEnabled;
      } catch {
        return instance.request.reauthentication_enabled;
      }
    },
    [instance, updateInstance]
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
