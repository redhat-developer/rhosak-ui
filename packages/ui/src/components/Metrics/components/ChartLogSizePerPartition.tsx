import type { ChartVoronoiContainerProps } from "@patternfly/react-charts";
import { ChartLine } from "@patternfly/react-charts";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLegend,
  ChartThemeColor,
  ChartVoronoiContainer,
} from "@patternfly/react-charts";
import {
  chart_color_blue_300,
  chart_color_cyan_300,
} from "@patternfly/react-tokens";
import type { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { chartHeight, chartPadding } from "../consts";
import type { PartitionBytesMetric, PartitionSelect } from "../types";
import { ChartSkeletonLoader } from "./ChartSkeletonLoader";
import { useChartWidth } from "./useChartWidth";
import {
  dateToChartValue,
  formatBytes,
  shouldShowDate,
  timestampsToTicks,
} from "./utils";

const colors = [chart_color_cyan_300.value, chart_color_blue_300.value];

type ChartData = {
  color: string;
  area: PartitionChartData[];
};

type PartitionChartData = {
  name: string;
  x: number;
  y: number;
};

type LegendData = {
  name: string;
};

export type ChartLogSizePerPartitionProps = {
  partitions: PartitionBytesMetric;
  topic: string | undefined;
  duration: number;
  isLoading: boolean;
  emptyState: ReactElement;
  selectedPartition: PartitionSelect;
};
export const ChartLogSizePerPartition: FunctionComponent<
  ChartLogSizePerPartitionProps
> = ({
  partitions,
  topic,
  duration,
  isLoading,
  emptyState,
  selectedPartition,
}) => {
    const { t } = useTranslation();
    const [containerRef, width] = useChartWidth();

    const { chartData, legendData, tickValues } = getChartData(
      partitions,
      topic,
      duration,
      selectedPartition
    );

    const hasMetrics = Object.keys(partitions).length > 0;

    const showDate = shouldShowDate(duration);

    return (
      <div ref={containerRef} style={{ marginTop: "-30px", height: "700px", width: "650px" }}>
        {(() => {
          switch (true) {
            case isLoading:
              return <ChartSkeletonLoader />;
            case !hasMetrics:
              return emptyState;
            default: {
              const labels: ChartVoronoiContainerProps["labels"] = ({ datum }) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-argument
                `${datum.name}: ${formatBytes(datum.y)}`;

              return (
                <Chart
                  ariaTitle={t("metrics:log_size_per_partition")}
                  containerComponent={
                    <ChartVoronoiContainer
                      labels={labels}
                      constrainToVisibleArea
                    />
                  }
                  legendPosition="bottom-left"
                  legendComponent={<ChartLegend data={legendData} />}
                  height={chartHeight}
                  padding={chartPadding}
                  themeColor={ChartThemeColor.multiOrdered}
                  width={width}
                  legendAllowWrap={true}
                >
                  <ChartAxis
                    label={"\n" + t("metrics:axis-label-time")}
                    tickValues={tickValues}
                    tickFormat={(d: number) =>
                      dateToChartValue(d, {
                        showDate,
                      })
                    }
                  />
                  <ChartAxis
                    label={"\n\n\n\n\n" + t("metrics:axis-label-bytes")}
                    dependentAxis
                    tickFormat={formatBytes}
                  />
                  <ChartGroup>
                    {chartData.map((value, index) => (
                      <ChartLine key={`chart-area-${index}`} data={value.area} />
                    ))}
                  </ChartGroup>
                </Chart>
              );
            }
          }
        })()}
      </div>
    );
  };

export function getChartData(
  partitions: PartitionBytesMetric,
  topic: string | undefined,
  duration: number,
  selectedPartition: PartitionSelect
): {
  legendData: Array<LegendData>;
  chartData: Array<ChartData>;
  tickValues: number[];
} {
  const legendData: Array<LegendData> = [];
  const chartData: Array<ChartData> = [];

  const top50Partition = Object.entries(partitions).sort((a, b) => {
    const aValue = Object.values(a[1]).reduce((sum, val) => sum + val, 0);
    const bValue = Object.values(b[1]).reduce((sum, val) => sum + val, 0);
    return bValue - aValue;
  });

  selectedPartition === "Top10"
    ? top50Partition.slice(0, 10).map(([partition, dataMap], index) => {
      const name = topic ? `${topic} / ${partition}` : partition;
      const color = colors[index];
      legendData.push({
        name,
      });
      const area: Array<PartitionChartData> = [];

      Object.entries(dataMap).map(([timestamp, value]) => {
        area.push({ name, x: parseInt(timestamp, 10), y: value });
      });
      chartData.push({ color, area });
    })
    : top50Partition
      .slice(0, 20)
      .sort((a, b) => {
        const dataMapAValues = Object.values(a[1]);
        const dataMapBValues = Object.values(b[1]);
        const aValueSum = dataMapAValues.reduce((sum, val) => sum + val, 0);
        const bValueSum = dataMapBValues.reduce((sum, val) => sum + val, 0);
        return bValueSum - aValueSum;
      })
      .sort((a, b) => b[1][1] - a[1][1])
      .slice(0, 20)
      .map(([partition, dataMap], index) => {
        const name = topic ? `${topic} / ${partition}` : partition;
        const color = colors[index];
        legendData.push({
          name,
        });
        const area: Array<PartitionChartData> = [];

        Object.entries(dataMap).map(([timestamp, value]) => {
          area.push({ name, x: parseInt(timestamp, 10), y: value });
        });
        chartData.push({ color, area });
      });

  const allTimestamps = Array.from(
    new Set(Object.values(partitions).flatMap((m) => Object.keys(m)))
  );
  const tickValues = timestampsToTicks(allTimestamps, duration);

  return {
    legendData,
    chartData,
    tickValues,
  };
}
