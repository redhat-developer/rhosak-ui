import { Button } from "@patternfly/react-core";
import { action, actions } from "@storybook/addon-actions";
import type { PlayFunction } from "@storybook/csf";
import { expect } from "@storybook/jest";
import type { Meta, Story } from "@storybook/react";
import type { ReactFramework } from "@storybook/react/types-6-0";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { useState } from "react";
import type { CloudProvider } from "ui-models/src/models/kafka";
import { apiError, fakeApi } from "../../../storiesHelpers";
import type { CreateDedicatedKafkaInstanceProps } from "../../CreateDedicatedKafkaInstance";
import { CreateDedicatedKafkaInstance } from "../../CreateDedicatedKafkaInstance";
import type { CreateDedicatedKafkaInstanceServices } from "../../machines";
import type {
  CloudProviderInfo,
  DedicatedPlanAvailability,
  StandardSizes,
  TrialPlanAvailability,
  TrialSizes,
} from "../../types";

const AWS: CloudProviderInfo = {
  id: "aws",
  displayName: "Amazon Web Services",
  regions: [
    { id: "eu-west-1", displayName: "EU, Ireland", isDisabled: false },
    {
      id: "us-east-1",
      displayName: "US East, N. Virginia",
      isDisabled: false,
    },
  ],
};

const AZURE: CloudProviderInfo = {
  id: "azure",
  displayName: "Microsoft Azure",
  regions: [
    {
      id: "australiaeast",
      displayName: "Australia East",
      isDisabled: false,
    },
    {
      id: "europenorth",
      displayName: "Europe North",
      isDisabled: false,
    },
  ],
};

const GCP: CloudProviderInfo = {
  id: "gcp",
  displayName: "Google Cloud Platform",
  regions: [
    { id: "eu-west-1", displayName: "EU, Ireland", isDisabled: false },
    {
      id: "us-east-1",
      displayName: "US East, N. Virginia",
      isDisabled: false,
    },
  ],
};

export const PROVIDERS: CloudProviderInfo[] = [AWS, GCP, AZURE];

const CLUSTERS = {
  c1: {
    id: "c1",
    status: "ready",
    name: "my awesome cluster name",
    az: "multi",
    cloudProvider: AWS,
    cloudRegion: AWS.regions[0],
    requiresPrivateNetwork: false,
  },
  c2: {
    id: "c2",
    status: "provisioning",
    name: "the less awesome one with quirks and a name that is too long",
    az: "multi",
    cloudProvider: AWS,
    cloudRegion: AWS.regions[0],
    requiresPrivateNetwork: false,
  },
} as const;

const CLUSTER_SIZES: { [key in keyof typeof CLUSTERS]: StandardSizes } = {
  c1: [
    {
      id: "x1",
      displayName: "1",
      quota: 1,
      status: "stable",
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
      isDisabled: false,
    },
    {
      id: "x2",
      displayName: "2",
      quota: 2,
      status: "preview",
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
      isDisabled: false,
    },
    {
      id: "x3",
      displayName: "3",
      quota: 3,
      status: "preview",
      ingress: 300,
      egress: 3001,
      storage: 500,
      connections: 600,
      connectionRate: 700,
      maxPartitions: 800,
      messageSize: 900,
      isDisabled: true,
    },
    {
      id: "x5",
      displayName: "5",
      quota: 5,
      status: "preview",
      ingress: 300,
      egress: 3001,
      storage: 500,
      connections: 600,
      connectionRate: 700,
      maxPartitions: 800,
      messageSize: 900,
      isDisabled: false,
    },
  ],
  c2: [
    {
      id: "x1",
      displayName: "1",
      quota: 3,
      status: "preview",
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
      isDisabled: false,
    },
    {
      id: "x2",
      displayName: "2",
      quota: 9,
      status: "preview",
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
      isDisabled: false,
    },
  ],
};

const STANDARD_SIZES: { [key in CloudProvider]: StandardSizes } = {
  aws: [
    {
      id: "x1",
      displayName: "1",
      quota: 1,
      status: "stable",
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
      isDisabled: false,
    },
    {
      id: "x2",
      displayName: "2",
      quota: 2,
      status: "preview",
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
      isDisabled: false,
    },
    {
      id: "x3",
      displayName: "3",
      quota: 3,
      status: "preview",
      ingress: 300,
      egress: 3001,
      storage: 500,
      connections: 600,
      connectionRate: 700,
      maxPartitions: 800,
      messageSize: 900,
      isDisabled: true,
    },
    {
      id: "x5",
      displayName: "5",
      quota: 5,
      status: "preview",
      ingress: 300,
      egress: 3001,
      storage: 500,
      connections: 600,
      connectionRate: 700,
      maxPartitions: 800,
      messageSize: 900,
      isDisabled: false,
    },
  ],
  azure: [
    {
      id: "x1",
      displayName: "1",
      quota: 3,
      status: "preview",
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
      isDisabled: false,
    },
    {
      id: "x2",
      displayName: "2",
      quota: 9,
      status: "preview",
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
      isDisabled: false,
    },
  ],
  gcp: [
    {
      id: "x1",
      displayName: "1",
      quota: 3,
      status: "preview",
      ingress: 3,
      egress: 31,
      storage: 5,
      connections: 6,
      connectionRate: 7,
      maxPartitions: 8,
      messageSize: 9,
      isDisabled: false,
    },
    {
      id: "x2",
      displayName: "2",
      quota: 9,
      status: "preview",
      ingress: 30,
      egress: 301,
      storage: 50,
      connections: 60,
      connectionRate: 70,
      maxPartitions: 80,
      messageSize: 90,
      isDisabled: false,
    },
  ],
};

const TRIAL_SIZES: { [key in CloudProvider]: TrialSizes } = {
  aws: {
    standard: STANDARD_SIZES.aws,
    trial: {
      id: "trialx1",
      displayName: "1",
      quota: 0,
      status: "stable",
      ingress: 1,
      egress: 1,
      storage: 1,
      connections: 1,
      connectionRate: 1,
      maxPartitions: 1,
      messageSize: 1,
      trialDurationHours: 48,
      isDisabled: false,
    },
  },
  azure: {
    standard: STANDARD_SIZES.azure,
    trial: {
      id: "trialx1",
      displayName: "1",
      quota: 0,
      status: "stable",
      ingress: 1,
      egress: 1,
      storage: 1,
      connections: 1,
      connectionRate: 1,
      maxPartitions: 1,
      messageSize: 1,
      trialDurationHours: 24,
      isDisabled: false,
    },
  },
  gcp: {
    standard: STANDARD_SIZES.gcp,
    trial: {
      id: "trialx1",
      displayName: "1",
      quota: 0,
      status: "stable",
      ingress: 1,
      egress: 1,
      storage: 1,
      connections: 1,
      connectionRate: 1,
      maxPartitions: 1,
      messageSize: 1,
      trialDurationHours: 24,
      isDisabled: false,
    },
  },
};

function makeCheckDedicatedQuota(
  options: {
    dedicatedScenario: DedicatedPlanAvailability;
    developerScenario: TrialPlanAvailability;
    remainingDedicatedQuota: number | undefined;
  },
  latency = 500
): CreateDedicatedKafkaInstanceServices["checkDedicatedQuota"] {
  const { dedicatedScenario, developerScenario, remainingDedicatedQuota } =
    options;
  const cb: CreateDedicatedKafkaInstanceServices["checkDedicatedQuota"] = ({
    onQuotaAvailable,
    onNoQuotaAvailable,
    onOutOfQuota,
  }) => {
    setTimeout(() => {
      switch (dedicatedScenario) {
        case "available":
          onQuotaAvailable({
            quota: {
              remainingDedicatedQuota,
            },
          });
          break;
        case "clusters-unavailable":
          onNoQuotaAvailable({
            hasTrialQuota: developerScenario === "available",
          });
          break;
        case "out-of-quota":
          onOutOfQuota({});
      }
    }, latency);
  };
  return cb;
}

function makeCheckDeveloperAvailability(
  availability: TrialPlanAvailability,
  latency: number
) {
  const cb: CreateDedicatedKafkaInstanceServices["checkDeveloperAvailability"] =
    ({ onAvailable, onUsed, onUnavailable }) => {
      setTimeout(() => {
        switch (availability) {
          case "available":
            onAvailable();
            break;
          case "used":
            onUsed();
            break;
          case "unavailable":
            onUnavailable();
            break;
        }
      }, latency);
    };
  return cb;
}

export const argTypes = {
  apiPlan: {
    table: { category: "Plan" },
    control: "radio",
    options: ["dedicated", "developer"],
  },
  apiSizes: {
    options: ["normal", "no-sizes", "error"],
    table: { category: "Backend scenario" },
    control: "radio",
  },
  apiDedicatedScenario: {
    table: { category: "Plan" },
    control: "radio",
    options: [
      "available",
      "out-of-quota",
      "instance-unavailable",
      "regions-unavailable",
      "backend-error",
    ],
    if: { arg: "apiPlan", eq: "dedicated" },
  },
  apiTrialScenario: {
    table: { category: "Plan" },
    control: "radio",
    options: ["available", "used", "unavailable", "backend-error"],
    if: { arg: "apiPlan", eq: "developer" },
  },
  apiRemainingDedicated: {
    table: { category: "Quota" },
    control: {
      type: "boolean",
    },
    if: { arg: "apiPlan", eq: "dedicated" },
  },
  apiRemainingDedicatedQuota: {
    table: { category: "Quota" },
    control: {
      type: "range",
      min: 0,
      max: 25,
    },
    if: { arg: "apiRemainingDedicated" },
  },

  apiSimulateBackendError: {
    table: { category: "Backend scenario" },
    control: "boolean",
  },
  apiClusters: {
    options: Object.keys(CLUSTERS),
    table: { category: "Clusters" },
    control: {
      type: "check",
      labels: Object.fromEntries(
        Object.values(CLUSTERS).map((p) => [p.id, p.name])
      ),
    },
  },
  apiDefaultCluster: {
    options: PROVIDERS.map((p) => p.id),
    table: { category: "Providers & regions" },
    control: {
      type: "radio",
      labels: Object.fromEntries(PROVIDERS.map((p) => [p.id, p.displayName])),
    },
  },
  apiLatency: {
    table: { category: "Backend scenario" },
    control: "number",
  },
};

export type StoryProps = {
  apiPlan: "developer" | "dedicated";
  apiDedicatedScenario: DedicatedPlanAvailability;
  apiTrialScenario: TrialPlanAvailability;
  apiSimulateBackendError: boolean;
  apiSizes: "normal" | "no-sizes" | "error";
  apiClusters: (keyof typeof CLUSTERS)[];
  apiDefaultCluster: keyof typeof CLUSTERS;
  apiRemainingDedicated: boolean;
  apiRemainingDedicatedQuota: number;
  apiLatency: number;
  onCreate: CreateDedicatedKafkaInstanceProps["onCreate"];
  onClickQuickStart?: () => void;
  onClickContactUs?: () => void;
  onLearnHowToAddStreamingUnits?: () => void;
  onLearnMoreAboutSizes?: () => void;
  onClickKafkaOverview?: () => void;
  subscriptionOptionsHref: string;
};

export const defaultStoryArgs: StoryProps = {
  apiPlan: "dedicated",
  apiDedicatedScenario: "available",
  apiTrialScenario: "available",
  apiSizes: "normal",
  apiClusters: Object.keys(CLUSTERS) as (keyof typeof CLUSTERS)[],
  apiDefaultCluster: "c1",
  apiRemainingDedicated: true,
  apiRemainingDedicatedQuota: 3,
  apiSimulateBackendError: false,
  apiLatency: process.env.JEST_WORKER_ID ? 10 : 200,
  onCreate: (_data, onSuccess) => {
    action("onCreate")(_data);
    setTimeout(onSuccess, 500);
  },
  subscriptionOptionsHref: "/../overview",
};

export type StoryMeta = Meta<StoryProps>;

export const parameters = {
  controls: { include: /^api/ },
};

export const Template: Story<StoryProps> = (args, { id }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  const onOpenModal = () => {
    setIsModalOpen(true);
  };
  const onCreate: CreateDedicatedKafkaInstanceProps["onCreate"] = (
    data,
    onSuccess,
    onFailure
  ) => {
    args.onCreate(
      data,
      () => {
        onSuccess();
        onCloseModal();
      },
      onFailure
    );
  };

  const {
    apiClusters,
    apiDefaultCluster,
    apiPlan,
    apiTrialScenario,
    apiDedicatedScenario,
    apiSimulateBackendError,
    apiSizes,
    apiRemainingDedicated,
    apiRemainingDedicatedQuota,
    apiLatency = 500,
  } = args;

  const clusters = Object.values(CLUSTERS).filter((p) =>
    apiClusters.includes(p.id)
  );

  const checkDedicatedQuota = apiSimulateBackendError
    ? () => apiError<void>(undefined, apiLatency)
    : makeCheckDedicatedQuota(
        {
          dedicatedScenario:
            apiPlan === "dedicated"
              ? apiDedicatedScenario
              : "clusters-unavailable",
          developerScenario: apiTrialScenario,
          remainingDedicatedQuota: apiRemainingDedicated
            ? apiRemainingDedicatedQuota
            : undefined,
        },
        apiLatency
      );

  const checkDeveloperAvailability = apiSimulateBackendError
    ? () => apiError<void>(undefined, apiLatency)
    : makeCheckDeveloperAvailability(apiTrialScenario, apiLatency);

  const fetchClusters: CreateDedicatedKafkaInstanceServices["fetchClusters"] =
    ({ onAvailable, onUnavailable }) => {
      const timeout = setTimeout(() => {
        switch (true) {
          // case "regionsMissing":
          // case "regionsDisabled":
          //   onUnavailable();
          //   break;
          default:
            onAvailable({
              clusters: clusters,
              defaultCluster: CLUSTERS[apiDefaultCluster],
            });
        }
        return () => clearTimeout(timeout);
      }, apiLatency);
    };

  const getDedicatedSizes: CreateDedicatedKafkaInstanceProps["getDedicatedSizes"] =
    (cluster) => {
      return apiSizes === "normal"
        ? fakeApi<StandardSizes>(
            CLUSTER_SIZES[cluster.id as keyof typeof CLUSTERS],
            apiLatency
          )
        : apiSizes === "no-sizes"
        ? fakeApi<StandardSizes>([], apiLatency)
        : apiError<StandardSizes>(undefined, apiLatency);
    };

  const getTrialSizes: CreateDedicatedKafkaInstanceProps["getTrialSizes"] = (
    provider
  ) => {
    return apiSizes === "normal"
      ? fakeApi<TrialSizes>(TRIAL_SIZES[provider], apiLatency)
      : apiSizes === "no-sizes"
      ? fakeApi<TrialSizes>({} as TrialSizes, apiLatency)
      : apiError<TrialSizes>(undefined, apiLatency);
  };

  const onClickHandlers = actions(
    "onClickQuickStart",
    "onClickKafkaOverview",
    "onClickContactUs",
    "onLearnHowToAddStreamingUnits",
    "onLearnMoreAboutSizes",
    "onClickKafkaOverview"
  );

  return (
    <div style={{ transform: "scale(1)", minHeight: 850, height: "100%" }}>
      <CreateDedicatedKafkaInstance
        key={JSON.stringify(args)}
        checkDeveloperAvailability={checkDeveloperAvailability}
        checkDedicatedQuota={checkDedicatedQuota}
        fetchClusters={fetchClusters}
        getDedicatedSizes={getDedicatedSizes}
        getTrialSizes={getTrialSizes}
        appendTo={() =>
          document.getElementById(`story--${id}`) ||
          document.getElementById("root") ||
          document.body
        }
        isModalOpen={isModalOpen}
        onCancel={onCloseModal}
        onCreate={onCreate}
        disableFocusTrap={true}
        onClickQuickStart={
          args.onClickQuickStart || onClickHandlers.onClickQuickStart
        }
        onClickContactUs={
          args.onClickContactUs || onClickHandlers.onClickContactUs
        }
        onLearnHowToAddStreamingUnits={
          args.onLearnHowToAddStreamingUnits ||
          onClickHandlers.onLearnHowToAddStreamingUnits
        }
        onLearnMoreAboutSizes={
          args.onLearnMoreAboutSizes || onClickHandlers.onLearnMoreAboutSizes
        }
        onClickKafkaOverview={
          args.onClickKafkaOverview || onClickHandlers.onClickKafkaOverview
        }
        subscriptionOptionsHref={args.subscriptionOptionsHref}
      />
      <div>
        <Button onClick={() => onOpenModal()}>Open modal</Button>
      </div>
    </div>
  );
};

export const sampleSubmit: PlayFunction<ReactFramework, StoryProps> = async ({
  canvasElement,
}) => {
  const canvas = within(canvasElement);

  await waitFor(
    () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      expect(canvas.getByLabelText("Name *")).toBeEnabled();
    },
    { timeout: 3000 }
  );

  userEvent.type(await canvas.findByLabelText("Name *"), "instance-name");

  expect(await canvas.findByTestId("size-slider")).not.toBeNull();

  userEvent.click(await canvas.findByTestId("modalCreateKafka-buttonSubmit"));
};
