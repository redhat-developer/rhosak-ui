import type { VoidFunctionComponent } from "react";
import { Metrics } from "ui";
import { DataPlaneHeaderConnected } from "./containers";
import type { DataPlaneRouteProps } from "./routes";

export const DashboardRoute: VoidFunctionComponent<DataPlaneRouteProps> = ({
  instancesHref,
}) => {
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"dashboard"}
      />
      <Metrics
        onCreateTopic={() => {}}
        onClickClose={() => {}}
        isClosed={false}
        getKafkaInstanceMetrics={() => {
          return Promise.resolve({
            usedDiskSpaceMetrics: {},
            clientConnectionsMetrics: {},
            connectionAttemptRateMetrics: {},
            connectionsLimit: 100,
            diskSpaceLimit: 1000,
            connectionRateLimit: 50,
          });
        }}
        getTopicsMetrics={() => {
          return Promise.resolve({
            kafkaTopics: [],
            metricsTopics: [],
            bytesIncoming: {},
            bytesOutgoing: {},
            incomingMessageRate: {},
            bytesPerPartition: {},
          });
        }}
        getMetricsKpi={() => {
          return Promise.resolve({
            topics: 123,
            topicPartitions: 123,
            consumerGroups: 123,
            topicPartitionsLimit: 123,
          });
        }}
      />
    </>
  );
};
