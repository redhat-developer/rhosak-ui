/* eslint-disable */
// @ts-nocheck
/* tslint:disable */
import { ScalprumComponent } from "@scalprum/react-core";
import type { VoidFunctionComponent } from "react";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicSchemasRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instanceTopicsHref, instancesHref }) => {
  const { topic } = useTopicGate();
  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceTopicsHref={instanceTopicsHref}
        activeSection={"schemas"}
      />
      <ScalprumComponent
        appName="applicationServices"
        scope="applicationServices"
        module="./TopicSchema"
        topicName={topic.name}
      />
    </>
  );
};
