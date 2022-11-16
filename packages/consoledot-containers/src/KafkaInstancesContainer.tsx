import type { FunctionComponent } from "react";
import type { KafkaInstance, KafkaInstancesProps } from "ui";
import { KafkaInstances } from "ui";
import type { PageRoute } from "./types";
import { useKafkaInstances } from "./useKafkaInstances";

export const KafkaInstancesContainer: FunctionComponent<
  PageRoute & Pick<KafkaInstancesProps<KafkaInstance>, "getUrlForInstance">
> = ({ getUrlForInstance, ...params }) => {
  const fetchInstances = useKafkaInstances(params);

  return (
    <KafkaInstances
      isRowSelected={() => false}
      getInstances={fetchInstances}
      getUrlForInstance={getUrlForInstance}
      onCreate={() => {}}
      onDetails={() => {}}
      onConnection={() => {}}
      onChangeOwner={() => {}}
      onDelete={() => {}}
      onClickConnectionTabLink={() => {}}
      onClickSupportLink={() => {}}
      onInstanceLinkClick={() => {}}
      onQuickstartGuide={() => {}}
      canChangeOwner={() => true}
      canDelete={() => true}
    />
  );
};
