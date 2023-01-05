import { QuickStartContext } from "@patternfly/quickstarts";
import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { KafkaInstancesSortableColumns, useKafkas } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import type { KafkaInstanceDrawerTab, KafkaInstancesProps } from "ui";
import { ControlPlaneHeader, KafkaInstances, useKafkaLabels } from "ui";
import type { Kafka, SimplifiedStatus } from "ui-models/src/models/kafka";
import { ReadyStatuses } from "ui-models/src/models/kafka";
import { useDrawer } from "../DrawerProvider";
import {
  ControlPlaneNewInstancePath,
  ControlPlaneRouteRoot,
} from "../routesConsts";

export type KafkaInstancesRoute = Pick<
  KafkaInstancesProps<Kafka>,
  "getUrlForInstance"
>;

export const KafkaInstancesRoute: FunctionComponent<KafkaInstancesRoute> = ({
  getUrlForInstance,
}) => {
  const history = useHistory();
  const { setActiveQuickStart } = useContext(QuickStartContext);

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

  const { data } = useKafkas({
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

  const onDetailsClick: KafkaInstancesProps["onDetails"] = useCallback(
    (instance) => {
      openDrawer(instance.id, "details");
    },
    [openDrawer]
  );

  const onConnectionsClick: KafkaInstancesProps["onDetails"] = useCallback(
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

  const onQuickstartGuide = useCallback(
    () => setActiveQuickStart && setActiveQuickStart("getting-started"),
    [setActiveQuickStart]
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
        onQuickstartGuide={onQuickstartGuide}
        canHaveInstanceLink={({ status }) => ReadyStatuses.includes(status)}
        canOpenConnection={({ status }) => ReadyStatuses.includes(status)}
        canChangeOwner={() => true}
        canDelete={() => true}
      />
    </>
  );
};
