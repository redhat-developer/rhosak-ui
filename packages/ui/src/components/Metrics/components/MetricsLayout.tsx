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
      className={
        "pf-u-px-lg-on-xl pf-u-pt-sm-on-xl pf-u-pb-lg-on-xl pf-u-px-md pf-u-pb-md"
      }
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
