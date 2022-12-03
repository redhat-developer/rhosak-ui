import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { SortableColumns, useKafkaInstances } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import type { KafkaInstance, KafkaInstancesProps, SimplifiedStatus } from "ui";
import { ControlPlaneHeader, KafkaInstances, useKafkaLabels } from "ui";
import { useDrawer } from "../DrawerProvider";

export type KafkaInstancesContainerProps = Pick<
  KafkaInstancesProps<KafkaInstance>,
  "getUrlForInstance"
>;

export const KafkaInstancesRoute: FunctionComponent<
  KafkaInstancesContainerProps
> = ({ getUrlForInstance }) => {
  const { selectedInstance, selectInstance, setActiveTab } = useDrawer();

  const labels = useKafkaLabels();

  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const namesChips = useURLSearchParamsChips("names", resetPaginationQuery);
  const ownersChips = useURLSearchParamsChips("owners", resetPaginationQuery);
  const statusesChips = useURLSearchParamsChips<SimplifiedStatus>(
    "statuses",
    resetPaginationQuery
  );

  const [isColumnSortable, sort, sortDirection] = useSortableSearchParams(
    SortableColumns,
    labels.fields,
    "createdAt",
    "desc"
  );

  const { data } = useKafkaInstances({
    page,
    perPage,
    name: namesChips.chips,
    owner: ownersChips.chips,
    status: statusesChips.chips,
    sort: sort!,
    direction: sortDirection,
  });

  const onClearAllFilters = useCallback(() => {
    namesChips.clearChained(
      ownersChips.clearChained(
        statusesChips.clearChained(setPaginationQuery(1, perPage))
      ),
      true
    );
  }, [namesChips, ownersChips, perPage, setPaginationQuery, statusesChips]);

  const handleDetailsClick: KafkaInstancesProps<KafkaInstance>["onDetails"] =
    useCallback(
      (instance) => {
        selectInstance(instance.id);
        setActiveTab("details");
      },
      [selectInstance, setActiveTab]
    );

  const handleConnectionsClick: KafkaInstancesProps<KafkaInstance>["onDetails"] =
    useCallback(
      (instance) => {
        selectInstance(instance.id);
        setActiveTab("connections");
      },
      [selectInstance, setActiveTab]
    );

  return (
    <>
      <ControlPlaneHeader />
      <KafkaInstances
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
        onChangeOwner={(row) => {}}
        onDelete={(row) => {}}
        onCreate={() => {}}
        isRowSelected={({ row }) => row.id === selectedInstance?.id}
        getUrlForInstance={getUrlForInstance}
        onDetails={handleDetailsClick}
        onConnection={handleConnectionsClick}
        onClickConnectionTabLink={() => {}}
        onClickSupportLink={() => {}}
        onInstanceLinkClick={() => {}}
        onQuickstartGuide={() => {}}
        canChangeOwner={() => true}
        canDelete={() => true}
      />
    </>
  );
};
