import {
  useKafkaInstanceKpiMetricsQuery,
  useKafkaInstanceMetricsQuery,
  useKafkaInstanceQuery,
  useKafkaInstanceTopicMetricsQuery,
  useKafkaInstanceTopicsQuery,
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
  const queryKpisMetrics = useKafkaInstanceKpiMetricsQuery();
  const queryInstanceMetrics = useKafkaInstanceMetricsQuery();
  const queryTopicMetrics = useKafkaInstanceTopicMetricsQuery();
  const queryTopics = useKafkaInstanceTopicsQuery();

  const getMetricsKpi: MetricsProps["getMetricsKpi"] = useCallback(async () => {
    const [instance, kpis] = await Promise.all([
      queryInstance(params.id),
      queryKpisMetrics(params.id),
    ]);
    return {
      ...kpis,
      topicPartitionsLimit: instance.maxPartitions || 0,
    };
  }, [params.id, queryInstance, queryKpisMetrics]);

  const getKafkaInstanceMetrics: MetricsProps["getKafkaInstanceMetrics"] =
    useCallback(
      async ({ interval, duration }) => {
        const [instance, metrics] = await Promise.all([
          queryInstance(params.id),
          queryInstanceMetrics(params.id, duration, interval),
        ]);
        if (!instance) {
          return Promise.reject("Can't retrieve instance");
        }
        return {
          ...metrics,
          diskSpaceLimit:
            (instance.request.max_data_retention_size?.bytes || 0) / 1073741824,
          connectionsLimit: instance.connections || 0,
          connectionRateLimit: instance.connectionRate || 0,
        };
      },
      [params.id, queryInstance, queryInstanceMetrics]
    );

  const getTopicsMetrics: MetricsProps["getTopicsMetrics"] = useCallback(
    async ({ interval, duration, selectedTopic }) => {
      const [instance, metrics] = await Promise.all([
        queryInstance(params.id),
        queryTopicMetrics(params.id, duration, interval, selectedTopic),
      ]);
      if (!instance || !instance.adminUrl) {
        return Promise.reject("Can't retrieve instance");
      }
      const topics = await queryTopics(instance.adminUrl);
      return {
        ...metrics,
        kafkaTopics: [],
      };
    },
    [params.id, queryInstance, queryTopicMetrics, queryTopics]
  );

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
        getKafkaInstanceMetrics={getKafkaInstanceMetrics}
        getTopicsMetrics={getTopicsMetrics}
        getMetricsKpi={getMetricsKpi}
      />
    </>
  );
};
