import { useDedicatedClusters, useKafkas } from "consoledot-api";
import type { FunctionComponent } from "react";
import type { ControlPlaneHeaderProps, KafkaInstancesProps } from "ui";
import {
  EmptyStateNoDedicatedClusters,
  EmptyStateNoDedicatedEntitlement,
  KafkaInstances,
} from "ui";
import { ReadyStatuses } from "ui-models/src/models/kafka";
import { useDedicatedGate } from "../../useDedicatedGate";
import { ConnectedControlPlaneHeader } from "./ConnectedControlPlaneHeader";
import { useKafkaInstancesTable } from "./useKafkaInstancesTable";

export type KafkaInstancesRoute = {
  activeSection: ControlPlaneHeaderProps["activeSection"];
  instancesHref: string;
  instanceSelectedHref: (id: string) => string;
  instanceCreationHref: string;
  instanceDeletionHref: (id: string) => string;
  instanceChangeOwnerHref: (id: string) => string;
} & Pick<KafkaInstancesProps, "getUrlForInstance">;

export const DedicatedKafkaInstancesRoute: FunctionComponent<
  KafkaInstancesRoute
> = (props) => {
  const dedicatedGate = useDedicatedGate();
  const noEntitlement = dedicatedGate === "standard-only";

  if (noEntitlement) {
    return (
      <>
        <ConnectedControlPlaneHeader activeSection={props.activeSection} />
        <EmptyStateNoDedicatedEntitlement
          onQuickstartGuide={() => {
            /* TODO */
          }}
        />
      </>
    );
  }

  return <DedicatedKafkaInstancesWithEntitlementRoute {...props} />;
};

export const DedicatedKafkaInstancesWithEntitlementRoute: FunctionComponent<
  KafkaInstancesRoute
> = ({
  activeSection,
  instancesHref,
  instanceDeletionHref,
  instanceSelectedHref,
  instanceCreationHref,
  instanceChangeOwnerHref,
  getUrlForInstance,
}) => {
  const {
    selectedInstance,
    page,
    perPage,
    setPagination,
    namesChips,
    ownersChips,
    statusesChips,
    isColumnSortable,
    sort,
    sortDirection,
    onClearAllFilters,
    onDetailsClick,
    onConnectionsClick,
    onCreate,
    onDelete,
    onChangeOwner,
    onQuickstartGuide,
  } = useKafkaInstancesTable({
    instancesHref,
    instanceDeletionHref,
    instanceSelectedHref,
    instanceCreationHref,
    instanceChangeOwnerHref,
  });
  const dedicatedClusters = useDedicatedClusters();
  const { data } = useKafkas({
    page,
    perPage,
    name: namesChips.chips,
    owner: ownersChips.chips,
    status: statusesChips.chips,
    sort: sort || "createdAt",
    direction: sortDirection,
    deployment: "clusters",
  });

  const hasReadyClusters = dedicatedClusters.isLoading
    ? true // let's use the table default loading logic until we know if we have ready clusters
    : (dedicatedClusters.data?.clusters || []).filter(
        (c) => c.status === "ready"
      ).length > 0;

  return (
    <>
      <ConnectedControlPlaneHeader activeSection={activeSection} />
      {hasReadyClusters ? (
        <KafkaInstances
          columns={"dedicated"}
          instances={data?.instances}
          itemCount={data?.count}
          page={page}
          perPage={perPage}
          names={namesChips.chips}
          owners={ownersChips.chips}
          statuses={statusesChips.chips}
          isColumnSortable={isColumnSortable}
          onPageChange={setPagination}
          onSearchName={namesChips.add}
          onRemoveNameChip={namesChips.remove}
          onRemoveNameChips={namesChips.clear}
          onSearchOwner={ownersChips.add}
          onRemoveOwnerChip={ownersChips.remove}
          onRemoveOwnerChips={ownersChips.clear}
          onSearchStatus={statusesChips.toggle}
          onRemoveStatusChip={statusesChips.remove}
          onRemoveStatusChips={statusesChips.clear}
          onClearAllFilters={onClearAllFilters}
          onChangeOwner={onChangeOwner}
          onDelete={onDelete}
          onCreate={onCreate}
          isRowSelected={({ row }) => row.id === selectedInstance}
          getUrlForInstance={getUrlForInstance}
          onDetails={onDetailsClick}
          onConnection={onConnectionsClick}
          onClickConnectionTabLink={() => {
            /* TODO */
          }}
          onClickSupportLink={() => {
            /* TODO */
          }}
          onInstanceLinkClick={() => {
            /* TODO */
          }}
          onQuickstartGuide={onQuickstartGuide}
          canHaveInstanceLink={({ status }) => ReadyStatuses.includes(status)}
          canOpenConnection={({ status }) => ReadyStatuses.includes(status)}
          canChangeOwner={() => true}
          canDelete={() => true}
        />
      ) : (
        <EmptyStateNoDedicatedClusters onQuickstartGuide={onQuickstartGuide} />
      )}
    </>
  );
};
