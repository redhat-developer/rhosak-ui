import { PageSection } from "@patternfly/react-core";
import type { TableViewProps } from "@rhoas/app-services-ui-components";
import { TableView } from "@rhoas/app-services-ui-components";
import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";
import { useDedicatedClusterLabels } from "../../hooks";

const Columns = ["id", "status"] as const;

export type DedicatedClustersProps<
  T extends DedicatedCluster = DedicatedCluster
> = {
  clusters: Array<T> | undefined | null;
} & Pick<
  TableViewProps<T, (typeof Columns)[number]>,
  "itemCount" | "page" | "onPageChange"
>;

export const DedicatedClusters = <T extends DedicatedCluster>({
  clusters,
  itemCount,
  page,
  onPageChange,
}: DedicatedClustersProps<T>) => {
  const labels = useDedicatedClusterLabels();
  const breakpoint = "lg";

  return (
    <PageSection isFilled={true}>
      <TableView
        ariaLabel={"TODO"}
        data={clusters}
        columns={Columns}
        renderHeader={({ column, Th, key }) => (
          <Th key={key}>{labels.fields[column]}</Th>
        )}
        renderCell={({ column, row, Td, key }) => {
          return (
            <Td key={key} dataLabel={labels.fields[column]}>
              {(() => {
                switch (column) {
                  case "id":
                    return row.id;
                  case "status":
                    return row.status;
                }
              })()}
            </Td>
          );
        }}
        toolbarBreakpoint={breakpoint}
        itemCount={itemCount}
        page={page}
        onPageChange={onPageChange}
        emptyStateNoData={<div>TODO</div>}
        emptyStateNoResults={<div>TODO</div>}
      />
    </PageSection>
  );
};
