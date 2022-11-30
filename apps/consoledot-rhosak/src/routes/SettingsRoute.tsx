import type { VoidFunctionComponent } from "react";
import { Settings as SettingsComp } from "ui";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import type { DataPlaneRouteProps } from "./DataPlaneRoute";

export const SettingsRoute: VoidFunctionComponent<DataPlaneRouteProps> = ({
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
