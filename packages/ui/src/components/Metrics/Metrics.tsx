import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import {
  CardKafkaInstanceMetrics,
  CardTopicsMetrics,
  EmptyStateInitialLoading,
  EmptyStateMetricsUnavailable,
  MetricsLayout,
} from "./components";
import { CardKpi } from "./components/CardKpi";
import { MetricsLagAlert } from "./components/MetricsLagAlert";
import { PartitionCard } from "./components/PartitionCard";
import type { KafkaInstanceMetricsProviderProps } from "./KafkaInstanceMetricsProvider";
import { KafkaInstanceMetricsProvider } from "./KafkaInstanceMetricsProvider";
import type { MetricsKpiProviderProps } from "./MetricsKpiProvider";
import { MetricsKpiProvider } from "./MetricsKpiProvider";
import type { TopicsMetricsProviderProps } from "./TopicsMetricsProvider";
import { TopicsMetricsProvider } from "./TopicsMetricsProvider";
import { useKafkaInstanceMetrics } from "./useKafkaInstanceMetrics";
import { useMetricsKpi } from "./useMetricsKpi";
import { useTopicsMetrics } from "./useTopicsMetrics";

export type MetricsProps = {
  onCreateTopic: () => void;
  onAlertClose: () => void;
  hasUserAlreadyClosedAlert: boolean;
} & KafkaInstanceMetricsProviderProps &
  TopicsMetricsProviderProps &
  MetricsKpiProviderProps;

export const Metrics: VoidFunctionComponent<MetricsProps> = ({
  getKafkaInstanceMetrics,
  getTopicsMetrics,
  getMetricsKpi,
  onCreateTopic,
  onAlertClose,
  hasUserAlreadyClosedAlert,
}) => {
  return (
    <TopicsMetricsProvider getTopicsMetrics={getTopicsMetrics}>
      <KafkaInstanceMetricsProvider
        getKafkaInstanceMetrics={getKafkaInstanceMetrics}
      >
        <MetricsKpiProvider getMetricsKpi={getMetricsKpi}>
          <ConnectedMetrics
            onCreateTopic={onCreateTopic}
            onClickClose={onAlertClose}
            isClosed={hasUserAlreadyClosedAlert}
          />
        </MetricsKpiProvider>
      </KafkaInstanceMetricsProvider>
    </TopicsMetricsProvider>
  );
};

type ConnectedMetricsProps = {
  onCreateTopic: () => void;
  onClickClose: () => void;
  isClosed: boolean;
};
const ConnectedMetrics: VoidFunctionComponent<ConnectedMetricsProps> = ({
  onCreateTopic,
  onClickClose,
  isClosed,
}) => {
  const { t } = useTranslation();
  const kafkaInstanceMetrics = useKafkaInstanceMetrics();
  const topicsMetrics = useTopicsMetrics();
  const metricsKpi = useMetricsKpi();

  switch (true) {
    case kafkaInstanceMetrics.isInitialLoading ||
      topicsMetrics.isInitialLoading ||
      metricsKpi.isInitialLoading:
      return <EmptyStateInitialLoading />;
    case kafkaInstanceMetrics.isFailed &&
      topicsMetrics.isFailed &&
      topicsMetrics.isFailed:
    case kafkaInstanceMetrics.isJustCreated &&
      topicsMetrics.isJustCreated &&
      metricsKpi.isJustCreated:
      return <EmptyStateMetricsUnavailable />;
    default:
      return (
        <MetricsLayout
          metricsLagAlert={
            <MetricsLagAlert onClickClose={onClickClose} isClosed={isClosed} />
          }
          topicsKpi={
            <CardKpi
              metric={metricsKpi.topics}
              isLoading={metricsKpi.isInitialLoading || metricsKpi.isLoading}
              name={t("metrics:metric_kpi_topics_name")}
              popover={t("metrics:metric_kpi_topics_description")}
            />
          }
          topicPartitionsKpi={
            <PartitionCard
              metric={metricsKpi.topicPartitions}
              isLoading={metricsKpi.isInitialLoading || metricsKpi.isLoading}
              topicPartitionsLimit={metricsKpi.topicPartitionsLimit}
            />
          }
          consumerGroupKpi={
            <CardKpi
              metric={metricsKpi.consumerGroups}
              isLoading={metricsKpi.isInitialLoading || metricsKpi.isLoading}
              name={t("metrics:metric_kpi_consumerGroup_name")}
              popover={t("metrics:metric_kpi_consumerGroup_description")}
            />
          }
          diskSpaceMetrics={<ConnectedKafkaInstanceMetrics />}
          topicMetrics={
            <ConnectedTopicsMetrics onCreateTopic={onCreateTopic} />
          }
        />
      );
  }
};

const ConnectedKafkaInstanceMetrics: VoidFunctionComponent = () => {
  const {
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    duration,
    lastUpdated,
    usedDiskSpaceMetrics,
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    diskSpaceLimit,
    connectionsLimit,
    connectionRateLimit,
    onDurationChange,
    onRefresh,
  } = useKafkaInstanceMetrics();

  return (
    <CardKafkaInstanceMetrics
      usedDiskMetrics={usedDiskSpaceMetrics}
      clientConnectionsMetrics={clientConnectionsMetrics}
      connectionAttemptRateMetrics={connectionAttemptRateMetrics}
      duration={duration}
      backendUnavailable={isFailed}
      isInitialLoading={isInitialLoading}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isJustCreated={isJustCreated}
      lastUpdated={lastUpdated}
      onRefresh={onRefresh}
      onDurationChange={onDurationChange}
      diskSpaceLimit={diskSpaceLimit || 0}
      connectionsLimit={connectionsLimit || 0}
      connectionRateLimit={connectionRateLimit || 0}
    />
  );
};

type ConnectedTopicsMetricsProps = {
  onCreateTopic: () => void;
};
const ConnectedTopicsMetrics: VoidFunctionComponent<
  ConnectedTopicsMetricsProps
> = ({ onCreateTopic }) => {
  const {
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    lastUpdated,
    selectedTopic,
    duration,
    topics,
    bytesIncoming,
    bytesOutgoing,
    bytesPerPartition,
    incomingMessageRate,
    onDurationChange,
    onTopicChange,
    onRefresh,
    onSelectPartition,
    selectedPartition,
  } = useTopicsMetrics();

  return (
    <CardTopicsMetrics
      backendUnavailable={isFailed}
      topics={topics}
      incomingTopicsData={bytesIncoming}
      outgoingTopicsData={bytesOutgoing}
      partitions={bytesPerPartition}
      incomingMessageRate={incomingMessageRate}
      duration={duration}
      isInitialLoading={isInitialLoading}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isJustCreated={isJustCreated}
      lastUpdated={lastUpdated}
      selectedTopic={selectedTopic}
      onRefresh={onRefresh}
      onSelectedTopic={onTopicChange}
      onDurationChange={onDurationChange}
      onCreateTopic={onCreateTopic}
      onSelectedPartition={onSelectPartition}
      selectedPartition={selectedPartition}
    />
  );
};
