import {
  useKafkaInstanceMetricsKpiQuery,
  useKafkaInstanceQuery,
} from "consoledot-api";
import {
  metricsDismissLagAlerts,
  metricsIsLagAlertsDismissed,
} from "local-storage-helpers";
import type { VoidFunctionComponent } from "react";
import { useCallback, useState } from "react";
import type { MetricsProps } from "ui";
import { Metrics } from "ui";
import type { DataPlaneRouteProps } from "../routes";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import { useDataPlaneRouteMatch } from "./UseDataPlaneRouteMatch";

export const DashboardRoute: VoidFunctionComponent<DataPlaneRouteProps> = ({
  instancesHref,
}) => {
  const { params } = useDataPlaneRouteMatch();
  const [hasUserAlreadyClosedAlert, setHasUserAlreadyClosedAlert] = useState(
    metricsIsLagAlertsDismissed()
  );

  const onAlertClose = useCallback(() => {
    setHasUserAlreadyClosedAlert(true);
    metricsDismissLagAlerts();
  }, []);

  const queryInstance = useKafkaInstanceQuery();
  const queryKpis = useKafkaInstanceMetricsKpiQuery();

  const getMetricsKpi: MetricsProps["getMetricsKpi"] = useCallback(async () => {
    const [instance, kpis] = await Promise.all([
      queryInstance(params.id),
      queryKpis(params.id),
    ]);
    return {
      ...kpis,
      topicPartitionsLimit: instance.maxPartitions || 0,
    };
  }, [params.id, queryInstance, queryKpis]);

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
        getMetricsKpi={getMetricsKpi}
      />
    </>
  );
};
