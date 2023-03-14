import { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";
import { assign, createMachine, EventFrom, forwardTo } from "xstate";
import type {
  CreateDedicatedKafkaFormData,
  CreateDedicatedKafkaInstanceError,
  DedicatedPlanInitializationData,
  DedicatedSizes,
} from "../types";
import { DedicatedClustersInfo } from "../types";
import {
  DedicatedPlanMachine,
  DedicatedPlanMachineContext,
} from "./DedicatedPlanMachine";

type Quota = Pick<
  DedicatedPlanInitializationData,
  "plan" | "remainingDedicatedQuota" | "instanceAvailability"
>;

export type CreateDedicatedKafkaInstanceMachineContext = {
  quota: Quota | undefined;
  clusters: DedicatedClustersInfo | undefined;
  defaultCluster: DedicatedCluster | undefined;
  capabilities: DedicatedPlanInitializationData | undefined;
};

const CreateDedicatedKafkaInstanceMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMBOYCGAXMBpDAZgNYYCSAdrFhucmAHQA2A9hhAJblT0COArs2r1kACzDIinKAAIqNCBlQRp-QRgDEYVKmap6AB0bYCugLbD02PIRIU5tBizZTeAoaPGSus6uQVKVNwwETgA3ZmRsdmZyAG0ABgBdRFB9Zlh2LGjyFJAAD0QAFniAJnp4gGYAdkKATgAOeqr4qvrCgFYAGhAAT0QANir++n769tqq2sKARhKKjsKAX0XutEwcfGIySl86JlYOLlc1YTEJKR95RWVVanV7fxug6QxQjHYjACNGMFy0jKyMVyBQQxTKlRqDSaLTaXV6iHG8XoVXahX6UyqJVqJX6-WWq0sGxs23seych24twwp08Fwe10CanUzD4WGkzAIlz8DKpf3SmWywKKpXK1TqjWarQ63T6CHa8UK9Hqcw6JUK6palXxIDWVk2th2NDJBxcVJp5289ICVPU5GYXMejOoLzeHww31+SBA-wFQK9ILBoshEph0vhoPaw2hFRKasKbQa0yWKx1hOsWzsu0cJqOZqtEHUfIBgv9iCTU2RkZj03RYsjMoGyvo0yG40KJSq0wq02m9W1uqJGcNDn2zlzQXoEDAoTALH0WkLXp9gJypYQ5cVKP61drNXr4faFSRJVmdUmasjvf7af1JKzo4px3cZy8MinM7nWhd7y+H0yPU0bRdAMIwsBMVBzAHdMDVJbMx0pCcPAtN9p1nZh51Qb83U+P8sB6EJyHCSIVwSZIl35FchQQWpanaeh4y7JN5gqbFZgbOU1WRE96m3Bp+lRKoKmvdZoLvI04MfM0kNfaR3zQjCsN-Rh-3UOTP0wvhYEgItfVXUAQRouiGO7QpmNYkp2NMqolXqWZcSPCpRn6NFhL1YlM3Eh9TUQl8LjU9Cv1eH93VwgD-IUoLsJ+HTKLXQz6NskyzJPCzwwqdppnoWj4niaZ2kPepaiTaZXMHGD73JFwCDALBRAufQdFCdgp1QWB1Aa5gmpa2AXj8aR0CgbIesir5ovI4s-X0staNqegjzGcZ+hKHjeyqdj2jGcplu4moFSqKpStEjyR0qo5qtqkR6sa5qtDarQdD0QxjDMCwRNvY7jXg+hzrq7wOq626CKIqIYlImKSym9cMRsiY0RmaYFXiOFZUKfa5rqRy5mmWp4kGdpDve4dPsfH7Lr+67uvainbvZTCBqG6Q+HIEb3TG1IKIh-Jpsjeh2k7XHOw7QqWnY0Z6mbapakGNVqgR-GUygwnYK8rhVJiBg5BwV63KHZXTqgcHJq5hASlROj+lKCp6kqdUVvYq3Mr3ds0UaPLZgJ9yiY13xHSe8h6Gan57leT12YmvTjaxbd6NM+NDIVdLCkskUFmxyZt2cwYPd1+982kP36FgV4pHUKCAGU+GQOhYHgcbdKoxOjKR0p6nmYXlvt1Fyn6Lt1W7E9Jkc7Pys8vOC6LprVaggBRIDUENiOQSjioY7b+PTNRe2a152NbLy03M7y4exJHcKvwLwOwGDmcF6orFWl5i2Nt7toEYqUWpayrt5SW+z4ls4+H0GBn0wuPYuU80wVyrnAWuYd65rkbvRBUtQ6x9zaKLeMO8WhDB7PEKEtRAFe0nKhdS+cjD+wniXGec9b5rnvuLSMSNErxhmJUUWCMsrKmWngsEuJ5YpjtFOWBqY3qez1jmBCJxpJ0h9jyIItDIYI1SrKSM4tW6dmVB0TsaISoKxvGIiqEinzUnzAo42zRxYojmD3FEtk+bTFFkMZskYcS9mfiwwh4ivpmhAWYkEswGg2RwSxJosxSjrU4tjAePcEY8SKp4wx3ifK0m8CAxSIVlJ4T8QMfic1lrFVaMqeYDjwztjojxHhsYOxW1ssmAkoic6eX1sY7JCBWjsQ7LNKWjRKiLRxmieW9SdYjxOkY0mV1Oo3Vaq0msCoY7FCGOlWMsxkYIkxMiHh7RYyMPjEJPRDSRnExcJYCAso4GxUhrGQY5QMpjCSpedaExkRND5jorEFQ9lDLKifI5XBWmb3DC2TKlRGLVCxBeDoCTR49CoGAUwjNmaulGqHb0HMjYgkciiLK+UUFWRxt2VZbT1mt1GK0Fo-EOx4n2cMn53srgBAvhANmqLw53yaIqfi4xsQdnyu2d+aVqjONbmna2OJuxQpHGPchhdwEGzrhc42MZBXYwmD3CE-F+j21jCMZy8Ytxdlom0CVewpU0FacteUIwcXcpRKiOY7FsYrzBdbeMhUWJt2NcAkhAVQHSsvuaxos19rzUxelFsyiBjdhGC2UYLY4k9l0V8o6RC0lgMnnK85nMMVVPKJo2GbiirsOsrMd1uU1SWzqSImlQDiEfh9WQs18qs2IGWrk4N-9Q0ZUxJZJoSolWVBylYwqnrhDMFMIYGqKLlzNoQNUf+SomFoP2p2Ht1lcZ5Roj2IW4rqXfKAa0o87EaI3JyhtQS2Ntyo2WMsIAA */
  createMachine(
    {
      context: {
        clusters: undefined,
        defaultCluster: undefined,
        quota: undefined,
        capabilities: undefined,
      },
      predictableActionArguments: true,
      tsTypes:
        {} as import("./CreateDedicatedKafkaInstanceMachine.typegen").Typegen0,
      schema: {
        context: {} as CreateDedicatedKafkaInstanceMachineContext,
        events: {} as
          | {
              type: "dedicated quota available";
              quota: Pick<
                DedicatedPlanInitializationData,
                "remainingDedicatedQuota"
              >;
            }
          | {
              type: "out of dedicated quota";
            }
          | {
              type: "no dedicated quota available";
            }
          | {
              type: "clusters available";
              clusters: DedicatedClustersInfo;
              defaultCluster: DedicatedCluster | undefined;
            }
          | { type: "clusters unavailable" }
          | { type: "save"; data: CreateDedicatedKafkaFormData }
          | { type: "createSuccess" }
          | { type: "createError"; error: CreateDedicatedKafkaInstanceError },
        services: {} as {
          checkDedicatedQuota: {
            data: never;
          };
          fetchClusters: {
            data: never;
          };
          dedicatedPlan: {
            data: DedicatedPlanMachineContext;
          };
        },
      },
      id: "createDedicatedKafkaInstance",
      initial: "loading",
      states: {
        loading: {
          description: "Fetch the data required to drive the creation flow",
          tags: "loading",
          initial: "quota",
          states: {
            quota: {
              initial: "checking dedicated quota",
              states: {
                "checking dedicated quota": {
                  invoke: {
                    src: "checkDedicatedQuota",
                    onError: [
                      {
                        actions: "setDedicatedUnavailable",
                        target:
                          "#createDedicatedKafkaInstance.system unavailable",
                      },
                    ],
                  },
                  on: {
                    "dedicated quota available": {
                      actions: "setDedicatedAvailable",
                      target: "dedicated",
                    },
                    "out of dedicated quota": {
                      actions: "setDedicatedOutOfQuota",
                      target: "dedicated",
                    },
                    "no dedicated quota available": {
                      actions: "setDedicatedUnavailable",
                      target:
                        "#createDedicatedKafkaInstance.system unavailable",
                    },
                  },
                },
                dedicated: {
                  type: "final",
                  always: {
                    target:
                      "#createDedicatedKafkaInstance.loading.fetching clusters",
                  },
                },
              },
            },
            "fetching clusters": {
              invoke: {
                src: "fetchClusters",
                onError: [
                  {
                    actions: "setClustersUnavailable",
                    target: "ready",
                  },
                ],
              },
              on: {
                "clusters available": {
                  actions: "setClusters",
                  target: "ready",
                },
                "clusters unavailable": {
                  actions: "setClustersUnavailable",
                  target: "ready",
                },
              },
            },
            ready: {
              type: "final",
              entry: "setCapabilities",
            },
          },
          onDone: [
            {
              cond: "dedicated plan",
              target: "dedicated plan",
            },
            {
              target: "system unavailable",
            },
          ],
        },
        "system unavailable": {
          tags: "systemUnavailable",
          type: "final",
        },
        "dedicated plan": {
          invoke: {
            src: "dedicatedPlan",
            id: "dedicatedPlanService",
          },
          tags: "dedicatedPlan",
          initial: "idle",
          states: {
            idle: {
              on: {
                save: {
                  target: "saving",
                },
              },
            },
            saving: {
              invoke: {
                src: "createInstance",
              },
              tags: "saving",
              on: {
                createSuccess: {
                  target: "#createDedicatedKafkaInstance.complete",
                },
                createError: {
                  actions: "notifyCreateErrorToDedicatedPlan",
                  target: "idle",
                },
              },
            },
          },
        },
        complete: {
          type: "final",
        },
      },
    },
    {
      actions: {
        setDedicatedAvailable: assign((_, event) => ({
          quota: {
            plan: "dedicated" as const,
            instanceAvailability: "available" as const,
            remainingDedicatedQuota: event.quota.remainingDedicatedQuota,
          },
        })),
        setDedicatedOutOfQuota: assign((_, event) => ({
          quota: {
            plan: "dedicated" as const,
            instanceAvailability: "out-of-quota" as const,
            remainingDedicatedQuota: 0,
          },
        })),
        setDedicatedUnavailable: assign((_) => ({
          quota: {
            plan: "dedicated" as const,
            instanceAvailability: "clusters-unavailable" as const,
            remainingDedicatedQuota: 0,
          },
        })),
        setClusters: assign((_, event) => {
          return {
            clusters: event.clusters,
            defaultCluster: event.defaultCluster,
          };
        }),
        setClustersUnavailable: assign((context) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const quota = context.quota!;
          quota.instanceAvailability = "clusters-unavailable";
          return {
            providers: [],
            quota,
          };
        }),
        setCapabilities: assign((context) => {
          const { clusters, defaultCluster, quota } = context;
          if (!clusters || !quota || quota.plan !== "dedicated") {
            throw new Error("unexpected condition, invalid quota");
          }
          const capabilities: DedicatedPlanInitializationData = {
            plan: "dedicated",
            availableClusters: clusters,
            defaultCluster,
            instanceAvailability: quota.instanceAvailability,
            remainingDedicatedQuota: quota.remainingDedicatedQuota,
          };
          return { capabilities };
        }),
        notifyCreateErrorToDedicatedPlan: forwardTo("dedicatedPlanService"),
      },
      guards: {
        "dedicated plan": (context) => context.quota?.plan === "dedicated",
      },
    }
  );

type EventTypes = Pick<
  EventFrom<typeof CreateDedicatedKafkaInstanceMachine>,
  "type"
>["type"];

type EventOptions<E extends EventTypes> = Omit<
  EventFrom<typeof CreateDedicatedKafkaInstanceMachine, E>,
  "type"
>;

export type CreateDedicatedKafkaInstanceServices = {
  checkDedicatedQuota: (events: {
    onOutOfQuota: (p: EventOptions<"out of dedicated quota">) => void;
    onQuotaAvailable: (p: EventOptions<"dedicated quota available">) => void;
    onNoQuotaAvailable: (
      p: EventOptions<"no dedicated quota available">
    ) => void;
  }) => void;
  fetchClusters: (
    plan: "dedicated",
    events: {
      onAvailable: (p: EventOptions<"clusters available">) => void;
      onUnavailable: () => void;
    }
  ) => void;
  getDedicatedSizes: (cluster: DedicatedCluster) => Promise<DedicatedSizes>;
  onCreate: (
    data: CreateDedicatedKafkaFormData,
    onSuccess: () => void,
    onError: (error: CreateDedicatedKafkaInstanceError) => void
  ) => void;
};

export function makeCreateDedicatedKafkaInstanceMachine({
  checkDedicatedQuota: checkDedicatedQuotaCb,
  fetchClusters: fetchClustersCb,
  getDedicatedSizes: getDedicatedSizesCb,
  onCreate,
}: CreateDedicatedKafkaInstanceServices) {
  return CreateDedicatedKafkaInstanceMachine.withConfig({
    services: {
      checkDedicatedQuota: () => {
        return (send) =>
          checkDedicatedQuotaCb({
            onNoQuotaAvailable: () => {
              send({ type: "no dedicated quota available" });
            },
            onOutOfQuota: () => {
              send({ type: "out of dedicated quota" });
            },
            onQuotaAvailable: ({ quota }) => {
              send({ type: "dedicated quota available", quota });
            },
          });
      },
      fetchClusters: (context) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const instanceType = context.quota!.plan;
        return (send) => {
          fetchClustersCb(instanceType, {
            onAvailable: ({ clusters, defaultCluster }) =>
              send({
                type: "clusters available",
                clusters,
                defaultCluster,
              }),
            onUnavailable: () => send("clusters unavailable"),
          });
        };
      },
      createInstance: (_context, event) => {
        const form = event.data;

        return (send) => {
          function onSuccess() {
            send("createSuccess");
          }

          function onError(error: CreateDedicatedKafkaInstanceError) {
            send({ type: "createError", error });
          }

          onCreate(
            {
              plan: form.plan,
              name: form.name,
              cluster: form.cluster,
              sizeId: form.sizeId,
              billing: form.billing,
            },
            onSuccess,
            onError
          );
        };
      },
      dedicatedPlan: (context) => {
        return DedicatedPlanMachine.withContext({
          capabilities: context.capabilities as DedicatedPlanInitializationData,
          sizes: undefined,
          form: {},
          creationError: undefined,
        }).withConfig({
          services: {
            getSizes: (context) => {
              const form = context.form as Required<typeof context.form>;
              return getDedicatedSizesCb(form.cluster);
            },
          },
        });
      },
    },
  });
}