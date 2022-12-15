import type { VoidFunctionComponent } from "react";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicSchemasRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instancesHref }) => {
  const { topic } = useTopicGate(instancesHref, instanceDetailsHref);

  return (
    <DataPlaneTopicHeaderConnected
      instancesHref={instancesHref}
      instanceDetailsHref={instanceDetailsHref}
      activeSection={"schemas"}
    />
  );
};
