import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import {
  KafkaInstancesSortableColumns,
  useKafkaInstances,
} from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type {
  KafkaInstance,
  KafkaInstanceDrawerTab,
  KafkaInstancesProps,
  SimplifiedStatus,
} from "ui";
import {
  ControlPlaneHeader,
  KafkaInstances,
  ReadyStatuses,
  useKafkaLabels,
} from "ui";
import { useDrawer } from "../../../DrawerProvider";
import { ControlPlaneNewInstancePath, ControlPlaneRouteRoot } from "../routes";

export type StreamsRouteProps = Pick<
  KafkaInstancesProps<KafkaInstance>,
  "getUrlForInstance"
>;

export const KafkaInstancesRoute: FunctionComponent<StreamsRouteProps> = ({
  getUrlForInstance,
}) => {
  const history = useHistory();

  const { selectedInstance, toggleExpanded, setActiveTab, isExpanded } =
    useDrawer(
      useCallback(() => history.replace(`${ControlPlaneRouteRoot}`), [history])
    );

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
    KafkaInstancesSortableColumns,
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

  const openDrawer = useCallback(
    (id: string, tab: KafkaInstanceDrawerTab) => {
      if (selectedInstance === id && isExpanded) {
        toggleExpanded(false);
      } else {
        history.replace(`${ControlPlaneRouteRoot}/${id}`);
        toggleExpanded(true);
        setActiveTab(tab);
      }
    },
    [history, isExpanded, selectedInstance, setActiveTab, toggleExpanded]
  );

  const onDetailsClick: KafkaInstancesProps<KafkaInstance>["onDetails"] =
    useCallback(
      (instance) => {
        openDrawer(instance.id, "details");
      },
      [openDrawer]
    );

  const onConnectionsClick: KafkaInstancesProps<KafkaInstance>["onDetails"] =
    useCallback(
      (instance) => {
        openDrawer(instance.id, "connections");
      },
      [openDrawer]
    );

  const onCreate = useCallback(() => {
    history.push(`${ControlPlaneNewInstancePath}`);
  }, [history]);

  const onDelete = useCallback(
    ({ id }) => {
      history.push(`${ControlPlaneRouteRoot}/${id}/delete`);
    },
    [history]
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
        onDelete={onDelete}
        onCreate={onCreate}
        isRowSelected={({ row }) => row.id === selectedInstance}
        getUrlForInstance={getUrlForInstance}
        onDetails={onDetailsClick}
        onConnection={onConnectionsClick}
        onClickConnectionTabLink={() => {}}
        onClickSupportLink={() => {}}
        onInstanceLinkClick={() => {}}
        onQuickstartGuide={() => {}}
        canHaveInstanceLink={({ status }) => ReadyStatuses.includes(status)}
        canOpenConnection={({ status }) => ReadyStatuses.includes(status)}
        canChangeOwner={() => true}
        canDelete={() => true}
      />
    </>
  );
};
