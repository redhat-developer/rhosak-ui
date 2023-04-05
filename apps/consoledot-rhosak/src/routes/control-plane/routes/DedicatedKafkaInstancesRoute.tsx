import { useDedicatedClusters, useKafkas } from "consoledot-api";
import type { FunctionComponent } from "react";
import type { ControlPlaneHeaderProps, KafkaInstancesProps } from "ui";
import { EmptyStateNoDedicatedEntitlement, KafkaInstances } from "ui";
import { ReadyStatuses } from "ui-models/src/models/kafka";
import { EmptyStateNoDedicatedInstances } from "ui/src/components/KafkaInstances/components";
import type { DedicatedControlPlaneNavigationProps } from "../routesConsts";
import { ConnectedControlPlaneHeader } from "./ConnectedControlPlaneHeader";
import { useKafkaInstancesTable } from "./useKafkaInstancesTable";

export type KafkaInstancesRoute = {
  activeSection: ControlPlaneHeaderProps["activeSection"];
  instanceSelectedHref: (id: string) => string;
  instanceCreationHref: string;
  instanceDeletionHref: (id: string) => string;
  instanceChangeOwnerHref: (id: string) => string;
} & Pick<KafkaInstancesProps, "getUrlForInstance"> &
  DedicatedControlPlaneNavigationProps;

export const DedicatedKafkaInstancesRoute: FunctionComponent<
  KafkaInstancesRoute
> = ({
  activeSection,
  instancesHref,
  clustersHref,
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
    instanceType: "dedicated",
  });

  const hasReadyClusters = dedicatedClusters.isLoading
    ? false
    : (dedicatedClusters.data?.clusters || []).filter(
        (c) => c.status === "ready"
      ).length > 0;

  return (
    <>
      <ConnectedControlPlaneHeader
        activeSection={activeSection}
        instancesHref={instancesHref}
        clustersHref={clustersHref}
      />
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
        emptyStateNoData={
          hasReadyClusters ? (
            <EmptyStateNoDedicatedInstances
              onCreate={onCreate}
              onQuickstartGuide={onQuickstartGuide}
            />
          ) : (
            <EmptyStateNoDedicatedEntitlement
              onQuickstartGuide={onQuickstartGuide}
            />
          )
        }
      />
    </>
  );
};
