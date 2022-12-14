import { useKafkaUpdateInstanceMutation } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type { SettingsProps } from "ui";
import { Settings as SettingsComp } from "ui";
import type { NavigationProps } from "../routes";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import { useDataPlaneInstance } from "./useDataPlaneInstance";

export const SettingsRoute: VoidFunctionComponent<NavigationProps> = ({
  instancesHref,
}) => {
  const { instance } = useDataPlaneInstance(instancesHref);
  const updateInstance = useKafkaUpdateInstanceMutation();

  const onSubmitReAuthentication = useCallback<
    SettingsProps["onSubmitReAuthentication"]
  >(
    async (reauthenticationEnabled) => {
      try {
        await updateInstance.mutateAsync({
          id: instance!.id,
          updates: { reauthentication_enabled: reauthenticationEnabled },
        });
        return reauthenticationEnabled;
      } catch {
        return instance!.request.reauthentication_enabled;
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
        reauthenticationEnabled={instance!.request.reauthentication_enabled}
      />
    </>
  );
};
