import { PageSection } from "@patternfly/react-core";
import { TableVariant } from "@patternfly/react-table";
import type { TableViewProps } from "@rhoas/app-services-ui-components";
import {
  EmptyStateNoResults,
  TableView,
} from "@rhoas/app-services-ui-components";
import { useTranslation } from "react-i18next";
import type {
  ConsumerGroup,
  ConsumerGroupField,
} from "ui-models/src/models/consumer-group";
import { ConsumerGroupEmptyState, ConsumerGroupStateLabel } from "./components";
import { useConsumerGroupLabels } from "../../hooks";

type SubUnion<T, U extends T> = U;

const Columns: SubUnion<
  ConsumerGroupField,
  "groupId" | "activeConsumers" | "laggingPartitions" | "state"
>[] = ["groupId", "activeConsumers", "laggingPartitions", "state"];

export type ConsumerGroupsProps<T extends ConsumerGroup> = {
  consumers: Array<T> | undefined;
  onDelete: (row: T) => void;
  onViewPartition: (row: T) => void;
  onViewResetOffset: (row: T) => void;
  consumerName: string[];
  onSearchConsumer: (value: string) => void;
  onRemoveConsumerChip: (value: string) => void;
  onRemoveConsumerChips: () => void;
} & Pick<
  TableViewProps<T, (typeof Columns)[number]>,
  | "itemCount"
  | "page"
  | "perPage"
  | "onPageChange"
  | "isRowSelected"
  | "isColumnSortable"
  | "onClearAllFilters"
>;

export const ConsumerGroups = <T extends ConsumerGroup>({
  consumers,
  onDelete,
  onViewPartition,
  isColumnSortable,
  itemCount,
  onViewResetOffset,
  onClearAllFilters,
  page,
  perPage,
  onPageChange,
  consumerName,
  onSearchConsumer,
  onRemoveConsumerChip,
  onRemoveConsumerChips,
}: ConsumerGroupsProps<T>) => {
  const { t } = useTranslation("kafka");

  const labels = useConsumerGroupLabels();

  const isFiltered = consumerName.length > 0;
  return (
    <PageSection isFilled={true} hasOverflowScroll={true} aria-label={"TODO"}>
      <TableView
        variant={TableVariant.compact}
        tableOuiaId={"card-table"}
        ariaLabel={t("consumerGroup.consumer_group_list")}
        data={consumers}
        columns={Columns}
        renderHeader={({ column, Th, key }) => (
          <Th
            key={key}
            info={
              column === "laggingPartitions"
                ? {
                    popover: (
                      <div>
                        {t("consumerGroup.partitions_with_lag_description")}
                      </div>
                    ),
                    ariaLabel: "partitions with lag",
                    popoverProps: {
                      headerContent: t(
                        "consumerGroup.partitions_with_lag_name"
                      ),
                    },
                  }
                : undefined
            }
          >
            {labels.fields[column]}
          </Th>
        )}
        renderCell={({ column, row, Td, key }) => {
          return (
            <Td key={key} dataLabel={labels.fields[column]}>
              {(() => {
                switch (column) {
                  case "groupId":
                    return row.groupId;
                  case "activeConsumers":
                    return row.activeConsumers;
                  case "laggingPartitions":
                    return row.laggingPartitions;
                  case "state":
                    return <ConsumerGroupStateLabel state={row.state} />;
                }
              })()}
            </Td>
          );
        }}
        renderActions={({ row, ActionsColumn }) => (
          <ActionsColumn
            items={[
              {
                title: t("consumerGroup.view_partitions_offsets"),
                onClick: () => onViewPartition(row),
              },
              {
                title: t("consumerGroup.reset_offset"),
                onClick: () => onViewResetOffset(row),
              },
              {
                title: t("common:delete"),
                onClick: () => onDelete(row),
              },
            ]}
          />
        )}
        isColumnSortable={isColumnSortable}
        filters={{
          [labels.fields.groupId]: {
            type: "search",
            chips: consumerName,
            onSearch: onSearchConsumer,
            onRemoveChip: onRemoveConsumerChip,
            onRemoveGroup: onRemoveConsumerChips,
            validate: (value: string) => !/["$^<>|+%/;:,\s*=~#()]/.test(value),
            errorMessage: t("input_field_invalid_message"),
          },
        }}
        itemCount={itemCount}
        page={page}
        onPageChange={onPageChange}
        perPage={perPage}
        isFiltered={isFiltered}
        onClearAllFilters={onClearAllFilters}
        emptyStateNoData={<ConsumerGroupEmptyState />}
        emptyStateNoResults={<EmptyStateNoResults />}
      />
    </PageSection>
  );
};
