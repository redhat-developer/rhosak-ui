import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { KafkaInstancesSortableColumns } from "consoledot-api";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { KafkaInstanceDrawerTab, KafkaInstancesProps } from "ui";
import { useKafkaLabels } from "ui";
import type { SimplifiedStatus } from "ui-models/src/models/kafka";
import { useDrawer } from "../DrawerProvider";

export type UseKafkaInstancesTableProps = {
  instancesHref: string;
  instanceSelectedHref: (id: string) => string;
  instanceCreationHref: string;
  instanceDeletionHref: (id: string) => string;
  instanceChangeOwnerHref: (id: string) => string;
};

export function useKafkaInstancesTable({
  instancesHref,
  instanceSelectedHref,
  instanceCreationHref,
  instanceDeletionHref,
  instanceChangeOwnerHref,
}: UseKafkaInstancesTableProps) {
  const history = useHistory();
  const { quickStarts } = useChrome();

  const { selectedInstance, toggleExpanded, setActiveTab, isExpanded } =
    useDrawer(
      useCallback(() => {
        history.replace(instancesHref);
      }, [history, instancesHref])
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
        history.replace(instanceSelectedHref(id));
        toggleExpanded(true);
        setActiveTab(tab);
      }
    },
    [
      history,
      instanceSelectedHref,
      isExpanded,
      selectedInstance,
      setActiveTab,
      toggleExpanded,
    ]
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
    history.push(instanceCreationHref);
  }, [history, instanceCreationHref]);

  const onDelete = useCallback<KafkaInstancesProps["onDelete"]>(
    ({ id }) => {
      history.push(instanceDeletionHref(id));
    },
    [history, instanceDeletionHref]
  );
  const onChangeOwner = useCallback<KafkaInstancesProps["onChangeOwner"]>(
    ({ id }) => {
      history.push(instanceChangeOwnerHref(id));
    },
    [history, instanceChangeOwnerHref]
  );

  const onQuickstartGuide = useCallback(
    () => quickStarts.toggle("getting-started"),
    [quickStarts]
  );

  return {
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
  };
}
