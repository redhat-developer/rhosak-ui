import { Grid, GridItem, PageSection } from "@patternfly/react-core";
import type { FunctionComponent, ReactElement } from "react";

type MetricsLayoutProps = {
  metricsLagAlert: ReactElement;
  topicsKpi: ReactElement;
  topicPartitionsKpi: ReactElement;
  consumerGroupKpi: ReactElement;
  diskSpaceMetrics: ReactElement;
  topicMetrics: ReactElement;
};
export const MetricsLayout: FunctionComponent<MetricsLayoutProps> = ({
  metricsLagAlert,
  topicsKpi,
  topicPartitionsKpi,
  consumerGroupKpi,
  diskSpaceMetrics,
  topicMetrics,
}) => {
  return (
    <PageSection
      hasOverflowScroll={true}
      aria-label={"TODO"}
      padding={{ default: "noPadding" }}
      className={"pf-u-px-lg pf-u-pt-sm pf-u-pb-lg"}
    >
      <Grid hasGutter>
        <GridItem>{metricsLagAlert}</GridItem>
        <GridItem sm={4}>{topicsKpi}</GridItem>
        <GridItem sm={4}>{topicPartitionsKpi}</GridItem>
        <GridItem sm={4}>{consumerGroupKpi}</GridItem>
        <GridItem lg={6}>{diskSpaceMetrics}</GridItem>
        <GridItem lg={6}>{topicMetrics}</GridItem>
      </Grid>
    </PageSection>
  );
};
