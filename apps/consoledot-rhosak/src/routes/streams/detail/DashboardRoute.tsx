import {
  metricsDismissLagAlerts,
  metricsIsLagAlertsDismissed,
} from "local-storage-helpers";
import type { VoidFunctionComponent } from "react";
import { useCallback, useState } from "react";
import { Metrics } from "ui";
import type { DataPlaneRouteProps } from "../routes";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const DashboardRoute: VoidFunctionComponent<DataPlaneRouteProps> = ({
  instancesHref,
}) => {
  const [hasUserAlreadyClosedAlert, setHasUserAlreadyClosedAlert] = useState(
    metricsIsLagAlertsDismissed()
  );
  const onAlertClose = useCallback(() => {
    setHasUserAlreadyClosedAlert(true);
    metricsDismissLagAlerts();
  }, []);
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"dashboard"}
      />
      <Metrics
        onCreateTopic={() => {}}
        onAlertClose={onAlertClose}
        hasUserAlreadyClosedAlert={hasUserAlreadyClosedAlert}
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
