import type { VoidFunctionComponent } from "react";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicEditPropertiesRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instanceTopicsHref, instancesHref }) => {
  const { instance, topic } = useTopicGate(instancesHref, instanceDetailsHref);

  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceTopicsHref={instanceTopicsHref}
        activeSection={"properties"}
      />
      {/*<CreateTopicPage*/}
      {/*  kafkaName={instance.name}*/}
      {/*  kafkaPageLink={instancesHref}*/}
      {/*  kafkaInstanceLink={instanceDetailsHref(instance.id)}*/}
      {/*  onSave={() => {}}*/}
      {/*  initialTopicValues={{} as Topic}*/}
      {/*  onCloseCreateTopic={() => {}}*/}
      {/*  checkTopicName={() => Promise.resolve(false)}*/}
      {/*  availablePartitionLimit={3}*/}
      {/*/>*/}
    </>
  );
};
