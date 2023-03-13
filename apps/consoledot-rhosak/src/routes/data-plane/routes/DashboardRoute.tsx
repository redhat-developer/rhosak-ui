import {
  useKafkaFetchQuery,
  useKafkaKpisFetchQuery,
  useKafkaMetricsFetchQuery,
  useTopicsFetchQuery,
  useTopicsMetricsFetchQuery,
} from "consoledot-api";
import {
  metricsDismissLagAlerts,
  metricsIsLagAlertsDismissed,
} from "local-storage-helpers";
import type { VoidFunctionComponent } from "react";
import { useCallback, useState } from "react";
import type { MetricsProps } from "ui";
import { Metrics } from "ui";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import { ControlPlaneRouteRoot } from "../../control-plane/routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import { useHistory } from "react-router-dom";

export const DashboardRoute: VoidFunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const {
    instance,
    match: { params },
  } = useDataPlaneGate();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const [hasUserAlreadyClosedAlert, setHasUserAlreadyClosedAlert] = useState(
    metricsIsLagAlertsDismissed()
  );

  const onAlertClose = useCallback(() => {
    setHasUserAlreadyClosedAlert(true);
    metricsDismissLagAlerts();
  }, []);

  const queryInstance = useKafkaFetchQuery();
  const queryKpisMetrics = useKafkaKpisFetchQuery();
  const queryInstanceMetrics = useKafkaMetricsFetchQuery();
  const queryTopicMetrics = useTopicsMetricsFetchQuery();
  const queryTopics = useTopicsFetchQuery();

  const getMetricsKpi: MetricsProps["getMetricsKpi"] = useCallback(async () => {
    const kpis = await queryKpisMetrics(params.id);
    return {
      ...kpis,
      topicPartitionsLimit: instance.maxPartitions || 0,
    };
  }, [instance, params.id, queryKpisMetrics]);

  const getKafkaInstanceMetrics: MetricsProps["getKafkaInstanceMetrics"] =
    useCallback(
      async ({ interval, duration, selectedBroker }) => {
        const [instance, metrics] = await Promise.all([
          queryInstance(params.id),
          queryInstanceMetrics({
            id: params.id,
            duration,
            interval,
            selectedBroker,
          }),
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
        queryTopicMetrics({ id: params.id, duration, interval, selectedTopic }),
      ]);
      if (!instance || !instance.adminUrl) {
        return Promise.reject("Can't retrieve instance");
      }
      const kafkaTopics = (
        await queryTopics({
          id: instance.id,
          adminUrl: instance.adminUrl,
          page: 1,
          perPage: 1000,
          plan: instance.plan,
        })
      ).topics.map((t) => t.name);
      return {
        ...metrics,
        kafkaTopics,
      };
    },
    [params.id, queryInstance, queryTopicMetrics, queryTopics]
  );

  const onCreateTopic = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(
      `${ControlPlaneRouteRoot}/${instance.id}/details/topics/create-topic`
    );
  }, [history, instance.id]);

  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"dashboard"}
      />
      <Metrics
        onCreateTopic={onCreateTopic}
        onAlertClose={onAlertClose}
        hasUserAlreadyClosedAlert={hasUserAlreadyClosedAlert}
        getKafkaInstanceMetrics={getKafkaInstanceMetrics}
        getTopicsMetrics={getTopicsMetrics}
        getMetricsKpi={getMetricsKpi}
      />
    </>
  );
};
