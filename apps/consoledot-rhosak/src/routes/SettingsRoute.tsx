import type { VoidFunctionComponent } from "react";
import { Settings as SettingsComp } from "ui";
import { DataPlaneHeaderConnected } from "./containers";
import type { DataPlaneRouteProps } from "./routes";

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
