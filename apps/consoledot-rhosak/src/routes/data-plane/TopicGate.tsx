import { Loading } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import type { DataPlaneNavigationProps } from "./routesConsts";
import { useTopicGate } from "./useTopicGate";

export const TopicGate: FunctionComponent<DataPlaneNavigationProps> = ({
  instancesHref,
  instanceDetailsHref,
  children,
}) => {
  const { topic } = useTopicGate(instancesHref, instanceDetailsHref);

  return topic ? <>{children}</> : <Loading />;
};
