import type { VoidFunctionComponent } from "react";
import { Settings as SettingsComp } from "ui";
import type { NavigationProps } from "../routes";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const SettingsRoute: VoidFunctionComponent<NavigationProps> = ({
  instancesHref,
}) => {
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"settings"}
      />
      <SettingsComp
        onSubmitReAuthentication={() => Promise.resolve(true)}
        reauthenticationEnabled={false}
      />
    </>
  );
};
