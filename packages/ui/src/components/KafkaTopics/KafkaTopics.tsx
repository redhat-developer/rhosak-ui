import { Button, PageSection } from "@patternfly/react-core";
import { TableVariant } from "@patternfly/react-table";
import type { TableViewProps } from "@rhoas/app-services-ui-components";
import {
  EmptyStateNoResults,
  TableView,
} from "@rhoas/app-services-ui-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { Topic, TopicField } from "ui-models/src/models/topic";
import { useTopicLabels } from "../../hooks";
import type { EmptyStateNoTopicProps } from "./components";
import { EmptyStateNoTopic } from "./components";
import { formattedRetentionSize, formattedRetentionTime } from "./types";

type SubUnion<T, U extends T> = U;

const Columns: SubUnion<
  TopicField,
  "name" | "partitions" | "retention.ms" | "retention.bytes"
>[] = ["name", "partitions", "retention.ms", "retention.bytes"];

export type KafkaTopicsProps<T extends Topic> = {
  topics: Array<T> | undefined;
  getUrlFortopic: (row: T) => string;
  onDelete: (row: T) => void;
  onEdit: (row: T) => void;
  topicName: string[];
  onSearchTopic: (value: string) => void;
  onRemoveTopicChip: (value: string) => void;
  onRemoveTopicChips: () => void;
  onTopicLinkClick: (row: T) => void;
} & Pick<
  TableViewProps<T, typeof Columns[number]>,
  | "itemCount"
  | "page"
  | "perPage"
  | "onPageChange"
  | "isRowSelected"
  | "isColumnSortable"
  | "onClearAllFilters"
> &
  EmptyStateNoTopicProps;

export const KafkaTopics = <T extends Topic>({
  topics,
  onDelete,
  onEdit,
  isColumnSortable,
  itemCount,
  onSearchTopic,
  topicName,
  onClearAllFilters,
  onCreateTopic,
  page,
  perPage,
  onPageChange,
  onRemoveTopicChip,
  onRemoveTopicChips,
  getUrlFortopic,
  onTopicLinkClick,
}: KafkaTopicsProps<T>) => {
  const { t } = useTranslation("topic");

  const labels = useTopicLabels();

  const isFiltered = topicName.length > 0;
  return (
    <PageSection isFilled={true} hasOverflowScroll={true} aria-label={"TODO"}>
      <TableView
        variant={TableVariant.compact}
        tableOuiaId={"card-table"}
        ariaLabel={t("topic_list_table")}
        data={topics}
        columns={Columns}
        renderHeader={({ column, Th, key }) => (
          <Th key={key}>{labels.fields[column]}</Th>
        )}
        renderCell={({ column, row, Td, key }) => {
          return (
            <Td key={key} dataLabel={labels.fields[column]}>
              {(() => {
                switch (column) {
                  case "name":
                    return (
                      <Button
                        variant="link"
                        component={(props) => (
                          <Link
                            to={getUrlFortopic(row)}
                            {...props}
                            data-testid="tableTopics-linkTopic"
                            data-ouia-component-id="table-link"
                          >
                            {row.name}
                          </Link>
                        )}
                        onClick={() => onTopicLinkClick(row)}
                        isInline
                      />
                    );
                  case "partitions":
                    return row.partitions.length;
                  case "retention.ms":
                    return formattedRetentionTime(row["retention.ms"].value);
                  case "retention.bytes":
                    return formattedRetentionSize(row["retention.bytes"].value);
                }
              })()}
            </Td>
          );
        }}
        renderActions={({ row, ActionsColumn }) => (
          <ActionsColumn
            items={[
              {
                title: t("table.actions.edit"),
                onClick: () => onEdit(row),
              },
              {
                title: t("table.actions.delete"),
                onClick: () => onDelete(row),
              },
            ]}
          />
        )}
        isColumnSortable={isColumnSortable}
        filters={{
          [labels.fields.name]: {
            type: "search",
            chips: topicName,
            onSearch: onSearchTopic,
            onRemoveChip: onRemoveTopicChip,
            onRemoveGroup: onRemoveTopicChips,
            validate: (value: string) => !/["$^<>|+%/;:,\s*=~#()]/.test(value),
            errorMessage: t("input_field_invalid_message"),
          },
        }}
        actions={[
          {
            label: t("create_topic"),
            onClick: onCreateTopic,
            isPrimary: true,
          },
        ]}
        itemCount={itemCount}
        page={page}
        onPageChange={onPageChange}
        perPage={perPage}
        isFiltered={isFiltered}
        onClearAllFilters={onClearAllFilters}
        emptyStateNoData={<EmptyStateNoTopic onCreateTopic={onCreateTopic} />}
        emptyStateNoResults={<EmptyStateNoResults />}
      />
    </PageSection>
  );
};
