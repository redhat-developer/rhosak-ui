import { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";
import { MarketplaceSubscription, Size } from "ui-models/src/models/kafka";
import { assign, createMachine, send, sendParent } from "xstate";
import {
  CreateDedicatedKafkaFormData,
  CreateDedicatedKafkaInstanceError,
  DedicatedPlanInitializationData,
  StandardSizes,
} from "../types";

export type DedicatedPlanMachineContext = {
  // initial data coming from the APIs
  capabilities: DedicatedPlanInitializationData;

  // what the user is selecting
  form: {
    name?: string;
    cluster?: DedicatedCluster;
    size?: Size;
    billing?: "prepaid";
  };

  sizes: StandardSizes | undefined;

  creationError: CreateDedicatedKafkaInstanceError | undefined;
};

export const DedicatedPlanMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SwC4EMB2E0CcIAUAbTAWTQGMALASwzADoA3MHagMwE8BBRta4gEb9qKDgGJEoAA4B7WCOoyMkkAA9EAZgAcARnoBOfQAYdOrQHYArABYNAJnMAaEB0Q6j++reuXL5k3bWWpY65gC+Yc6omNh4RKQUNHT05Eps1FAArqwYUPTRKJmwYuQ4YGgoYCqy8iiKykhqmjp29OYW5hpGQYG+zq4Ilvoa9KZGlh4a5joAbPqBEVHoWLgExBhkVLQMqRjpWTl5bDI4ALZMaITUEGLpYIQQAJIYvFcQ1XIKSirqCKGG9Ds+ksU1m5n0M2s1n0-UQdgmllGdjsOj8QJm7ihixA0RWcXWmySOzSGWytCOJ3Or2uYlgmQEpxEH1q9R+bmMnnMnRR9n8di0RjssIQ-MFo2sgQ81lCGjm2NxsTWCS2yV2+zJuXoxzO+TQjHJJTKFTAAGVMuRyHB4I0al8GqBfoEZlp6FpISYdBp7PprFZhaK9JDAuDproQfLlor4htEtsUiSDuStZTdfrcobypUAKI4HAnZl2tkinn0WVTFFQrS+mb+jEzehzMz84btazjCMxVbRwlxtWkw7Js63aj3J4vS7XAt1b6NR0+etaWXzPmQmsuOGmRGWfmWRchbctGYdvFKmMq4l7ftJu4PWD0DBoU4ManYSoSG2faf2poIIL15GmDo+iLkBdhGOYa4DLMUKjKCljOkYbrDFox5RgSsaqgmGpHCOt73o+YAZsaU6srObj2F45gSn4UIaDY7QaMKMouohVgzNuHhgRoOioV26HnvGl6JpqN4QHeD5PmIElgAAwpQmAwCRM4OuRrS+tRVG2PRi5MexrSojM9iIW2VgSrx+LKkSgnqgOol3lIeb6hALAXG8xrvtIn6kSpgxAm00IosiEEzDMTjriKHj1hMEIoqE1iGeYdjmaePaYUJ2FarhYn0A5MhOSwRGVEp36-J6alUfCml0b6Onhci8UGJxnoSuBGj6Ml3YYReNnXll9mOdcBW5flOByQpVQfiyyk-mVlEabR2mMXVUr0EYgo+qGQHtJYHX8VZfbCTho53mUUD1K51zucVRYHl4hg6EEPisdYTHwkYgLDNKRjsSF0I7ZEOKRnxlm9lhtl9fQp31IVE2eVNJWqXNlULTVS1QXR5iAqidgzCYApui0u0g2lPUiRDUNKGIw2DaN8m5LDIC2l+RazepyNaajTFdJ4OM8hBnRejxAMKsDZ77WDvXHZDYBnZTFMYGN9PXWRfwUWzNEcwxTEGaWvgWA9Gg+P41hE2LoPpeDUvyAAXs+E6voRys+b6gbcW7czQu4tUDA44KrZCsogfyXqm6l3VXmTVvULb9CEDIaAQAaEBKAwtCMDIADWDAixZZskxHR14TbDBxwn5IIGnMjkBU9QANpGAAuk7P6gvQNi6HY2gPVCwr2HRbS6PoVG7lYQyh111kF5lUcx6XifpiweY4DlxAoNq5w5ylE8HRldn5NHJfx-PUAVy8Vc10o9dN5NhYq9uLqBMiwEWBKneWL3vKrSEiHDOBILDOPASO9LZFwPjDZujpQq6wAuxYwoEpj+n-qMT0254KG3ig9QB4sLaS1AbbKmA1nK03GhAtwi4sYeisPMQw9hay4wML6RKhhvrgiFksTsucw6T0OtPPBhF5aK0UjfZmKtcYuh9GBQwGIUS1kNgYT6Ewfqd26Fg82pNC7ZWLrSA+giGZM28j+KiLopjbkhPrcCuhaweGgT4Ux-hZj-XYSeTqQCJaRz4WIIQhAri5F0aQ388E26NnYuCZcEEXp1VxpjAmVYqKsOBEeYWQNOHbzcRou8XifF5BfFdYRBjfjbhGFoAUZjZjLj8L3YpmM1pWHCZVGYONVH5x4XvTJSYlCEA4GaAQsBSjUCkF+YosB7hgHICgbpvTWADIMfo6apU1rWDaO6EKa0goNMqfoPQ-gbC4x9MBQUGgmnhxaRDNpmoHJgCkHwCAXAsATL6dMpQQyRljPuVMkRcNb4+UPIiYpQI9y7ngsBYU3hFlrU9GYjwIRwhJI4VvVxOD3HZTOXkC5Vzri3IgG8-pgzaQvJQPgMo6L3h5LmW4IwUxXS7i9L4KwswtAgr7m3FEQxEq6EhEc7hu9Tn8CyQQvKNM-GkoRqres3FURxPsMiIEvdAUD0XIhHG8VEKOMBnClx2D1G8LEmIZOyQCjZ2SfCzVU87L+NmOMNo7hxjlgaYbd+kT+6aWCG-XcSrOXAKTinfI6BKg+vVXtNRBd-H8hxq6aUxtfQmCkf6WU9YWhgUqiETEEQAYYBkM5a0yAjUarjMwVgnAeB8EEMIUQ-iQjhtCm1WUEofTjGFFYAw3oQj2p9NRTleUWAAEVMgyHQP4gUIxOLQh8FoX2DLwoJtLI9cFWg63TESU4tCxNU4YFxJaAAqg+Xg-A0ACEIHoryZKEBcnep0NtwQuTSIdT7ClrpQoonmC0XQa1F1qucYG5I8tYBbr1MWvdB7-FckWdCYpD1+RujHTCOqVZSwB3GMiRcwxZgerSf6wod5MhrvpIyFAlQSWfI+TNRCpY2pVhCI+jmwohg8zilRA2Y7fSocRXkAoRR8g4ZEPh-x84DBmGlPjLko8IkDAXatLoi54Sd3hPBZjWq2NZsZkekVsGvTAR8C0ICVHwoTBdKYUKLbkSsQhHJ01KY0723NeCRZnpNkmFCqEMdsaUSrWYd0LkgcTOwo-SurltkUwvis8BUY4EMQ-3cA9G9cJcYjFCmtYIQRhhzEOd55dedjm7xTLAPU5IQ0oIbBYDw4x5wojCj7Kw+lZScV8PCT0pmWlZb1JAENCUDDhOs8CYI-pwSIgabFHGHtMGpdFlwz1IlKRWf8LBOzYJHNCmWl0Nura51uu+vV7lUtpL0DAKcAZAxCP5MQEw0YhS2xoJqhOqCiUh3OmleMCEKWl0jdSSx7V4kCL0As28c1asKoa2qlrSd4J6zdG+h0MEXoTbDZSQirVe8tuBeFSzKiDYfT0UMqYkETFNkg4Mu0aY4xFxQ6ezDk1JzNsfZyUVJHKtDYjDavMKTc6vSdyYtd-2Y6jNDEMutkB2VpLmpI+rKqi0mK+E8AbX0QJWXGCStD41Qbyd4WpkQi6Dt-HaHrMubiHmTJukghuaEXhdzPo8BCFbvPcHZRVy5L7k4affJsICbQSrDBAiHlFkUXRFluk7nReYY7nQwpJwr5pG3leEJcojg7x6Kv+yCBYEEtWuT+gep4UdpupEW-l7msPfP+oCqIYLl0wuUaA9vdYta8xDJei6EYy3SKToy3OlTw98MixTBdKFAWLQbBlTK+RO9gR+NfW4vFFCOfP0Zfz9LWWGBPvjm+w7maExkG8lCCCQUtimLSkRPSl3zokNDZD7n6fVum9z7V0BxbDnBQNOdEBSEXMh8CahO4MfzoG-pNnzM5TLMhd-Yi6cyTrgR6CygoiJ7BAhQhRf5vb7wxyt4a7tANidD6bDwPrzY+wOYNiBCc4hTNiPbvppajZoZ7zFyfYQCAbL6lQUQgiGygFuztDwjdYQjiZQiigZ5vqbyn5+bn7wEMCJzZb7rNbUGIAdBeC6DcRVheiSGYFwjAh6DAgmCKJWDaA+CwFkEHz0AADufAdQuQAAYicD2n2mgD9q0HQVMLyNMDjAguFDSnoOMF7L-KoQApPr5mNt-uQZ2jgCYf2qIarBYZDgwZ6EwZ7l0HeozoqkEBYhPiflPrwY3vwVfgEZspyPZohuxN6HIQgBJmAdIdtA5tCMHkQc9rDqahDOQYvPmAEbNJYdyFyIeHYQMM2qtG2GVDaozhoZUVoXPLlgERBLFtoPfAKFCEMCJs0MMG0IlNuCGIuJ-u4elokV4QfMXktl6A0TYQlP6D4DZkBH3uBMPKqtwQkZ4XASimrsRLUdoI1J0IZBSn4HAuEZIf5C1O4EMJ3GwqUaToruHsirykmOmiaPivUAAEpgAACOmQ1AZQBGSm7eKs+WEw6+OuVe4RChro1mI6iE0a3RUsFxHSXS9IkyOK9Qd4ducJsyKmKOFiEq0wPQNglSwQowwQ0EYE-GcR3xoeZ+SRBJGAnS2Kjya6KRMeIqkWmMf4-IwOdqD0vcGJ0IkObq7Q4wXBOapxpBPK3i7S-JRJPSDygyA6q+tJfg9JY6jJ9hFUWMkIoQDEDSnJJxHhGp+JAJ5yRK1ymKgpgy22u2ZaARFgIw8IxgGmFKDgoQjKoQq0AQ9qjmwIeJeEFxaK7pdyxJ+pZJHGep7yv+CJ3yfIXgtmfeW0Y6l2iAb+Yq7QAo2y7g8IcZ-xWprplySZWKKZmZTyOUbp9uopRYzCroHgi4i4dKesIKtg6egoxSJSbU0wNZGSLpqK7ZNyyZGZpJTyA6RugZ3Q386+A+v4qIQ6r8hsVZvIU59AKK5qpgbcIZ0wqJUKsqa0bQPo7EFiEoKGixJBr2ZqfpIGgBZe3siAhgxizoY+-Ib+xSX+-i9Cam5GmmPo1UjKe+iGypYEVYJgnK2WzAlJf+Ks-yUUmyJp9Bl5saQwDYJgTCa0Y+boRyIa0S8U56NaQIZ2ORrQwwaR3oNewEz5EQQAA */
  createMachine(
    {
      context: {
        capabilities: {} as DedicatedPlanInitializationData,
        sizes: undefined,
        form: {},
        creationError: undefined,
      },
      tsTypes: {} as import("./DedicatedPlanMachine.typegen").Typegen0,
      predictableActionArguments: true,
      schema: {
        context: {} as DedicatedPlanMachineContext,
        events: {} as
          | { type: "fieldInvalid" }
          | { type: "nameChange"; name: string }
          | { type: "clusterChange"; cluster: DedicatedCluster }
          | { type: "sizeChange"; size: Size }
          | {
              type: "selectSubscription";
              subscription: MarketplaceSubscription;
            }
          | { type: "selectPrepaid" }
          | { type: "billingChange" }
          | { type: "nameIsValid" }
          | { type: "nameIsInvalid" }
          | { type: "nameIsTaken" }
          | { type: "submit" }
          | { type: "create" }
          | { type: "createSuccess" }
          | { type: "createError"; error: CreateDedicatedKafkaInstanceError },
        services: {} as {
          getSizes: {
            data: StandardSizes;
          };
        },
      },
      initial: "verifyAvailability",
      id: "dedicatedPlanMachine",
      states: {
        verifyAvailability: {
          entry: "setInitialContext",
          always: [
            {
              cond: "isOverQuota",
              target: "overQuota",
            },
            {
              cond: "isClusterUnavailable",
              target: "clusterUnavailable",
            },
            {
              target: "configuring",
            },
          ],
        },
        overQuota: {
          tags: "blocked",
        },
        clusterUnavailable: {
          tags: "blocked",
        },
        configuring: {
          type: "parallel",
          states: {
            status: {
              initial: "unsubmitted",
              states: {
                unsubmitted: {
                  tags: "unsubmitted",
                },
                submitting: {
                  entry: "triggerSubmit",
                  always: ["submitted"],
                },
                submitted: {
                  tags: "submitted",
                },
              },
              on: {
                create: {
                  description:
                    "Save is enabled all the time, if it's clicked before the form is completely filled out we should show the validation for all errored fields",
                  target: ".submitting",
                },
              },
            },
            form: {
              initial: "invalid",
              states: {
                invalid: {
                  tags: "formInvalid",
                },
                valid: {
                  entry: "resetCreationErrorMessage",
                  tags: "creatable",
                  on: {
                    fieldInvalid: {
                      target: "invalid",
                    },
                    submit: {
                      target: "saving",
                    },
                  },
                },
                saving: {
                  entry: ["resetCreationErrorMessage", "triggerSave"],
                  tags: "formSaving",
                  on: {
                    createSuccess: {
                      target: "saved",
                    },
                    createError: {
                      actions: "setCreationError",
                      target: "invalid",
                    },
                  },
                },
                saved: {
                  type: "final",
                },
              },
              on: {
                fieldInvalid: {
                  description:
                    "sent by the fields when their value change to an invalid value. This will transition the form to the invalid state, to then eventually transition to the valid state if the field state is marked as done (which means that all fields have a valid value selected)",
                  target: ".invalid",
                },
              },
            },
            fields: {
              tags: "configurable",
              type: "parallel",
              states: {
                name: {
                  initial: "validate",
                  states: {
                    empty: {
                      tags: "nameEmpty",
                    },
                    invalid: {
                      entry: "fieldInvalid",
                      tags: "nameInvalid",
                    },
                    valid: {
                      tags: "nameValid",
                      type: "final",
                    },
                    validate: {
                      always: [
                        {
                          cond: "nameIsEmpty",
                          target: "empty",
                        },
                        {
                          cond: "nameIsValid",
                          target: "valid",
                        },
                        {
                          target: "invalid",
                        },
                      ],
                    },
                  },
                  on: {
                    create: {
                      target: ".validate",
                    },
                    nameChange: {
                      actions: "setName",
                      target: ".validate",
                    },
                  },
                },
                cluster: {
                  initial: "validate",
                  states: {
                    validate: {
                      always: [
                        {
                          cond: "clusterIsValid",
                          target: "valid",
                        },
                        {
                          target: "invalid",
                        },
                      ],
                    },
                    invalid: {
                      entry: "fieldInvalid",
                      tags: "clusterInvalid",
                    },
                    valid: {
                      tags: "clusterValid",
                      type: "final",
                    },
                  },
                  on: {
                    create: {
                      target: ".validate",
                    },
                    clusterChange: {
                      actions: "setCluster",
                      cond: "didClusterChange",
                      target: ".validate",
                    },
                  },
                },
                size: {
                  initial: "validate",
                  states: {
                    validate: {
                      always: [
                        {
                          cond: "noCluster",
                          target: "idle",
                        },
                        {
                          cond: "noSizes",
                          target: "loading",
                        },
                        {
                          cond: "emptySizes",
                          target: "error",
                        },
                        {
                          cond: "sizeIsDisabled",
                          target: "disabled",
                        },
                        {
                          cond: "billingRequiredButNotSelected",
                          target: "waitingForQuota",
                        },
                        {
                          cond: "sizeIsOverQuota",
                          target: "overQuota",
                        },
                        {
                          target: "valid",
                        },
                      ],
                    },
                    idle: {
                      entry: "fieldInvalid",
                      tags: "sizeIdle",
                    },
                    disabled: {
                      entry: "fieldInvalid",
                      tags: "sizeDisabled",
                    },
                    waitingForQuota: {
                      entry: "fieldInvalid",
                      tags: "sizeWaitingForQuota",
                    },
                    overQuota: {
                      entry: "fieldInvalid",
                      tags: "sizeOverQuota",
                    },
                    valid: {
                      tags: "sizeValid",
                      type: "final",
                    },
                    error: {
                      entry: "fieldInvalid",
                      tags: "sizeError",
                    },
                    loading: {
                      description:
                        "Fetch the data required to show the available sizes and limits",
                      invoke: {
                        src: "getSizes",
                        onDone: [
                          {
                            actions: "setSizes",
                            target: "validate",
                          },
                        ],
                        onError: [
                          {
                            target: "error",
                          },
                        ],
                      },
                      tags: "sizeLoading",
                    },
                  },
                  on: {
                    create: {
                      target: ".validate",
                    },
                    clusterChange: {
                      target: ".validate",
                    },
                    sizeChange: {
                      actions: "setSize",
                      cond: "didSizeChange",
                      target: ".validate",
                    },
                    billingChange: {
                      target: ".validate",
                    },
                  },
                },
                billing: {
                  initial: "validate",
                  states: {
                    validate: {
                      always: [
                        {
                          target: "prepaidOnly",
                        },
                      ],
                    },
                    prepaidOnly: {
                      description:
                        "The user doesn't need to specify any option about the billing. The API will automatically figure out the right thing to do without giving it any information.",
                      tags: ["noBilling", "billingValid"],
                      entry: "setBillingToPrepaid",
                      type: "final",
                    },
                  },
                },
              },
              onDone: {
                target: "#dedicatedPlanMachine.configuring.form.valid",
              },
            },
          },
          onDone: {
            target: "saved",
          },
        },
        saved: {
          type: "final",
        },
      },
    },
    {
      actions: {
        setInitialContext: assign((context) => {
          return {
            form: {
              cluster: context.capabilities.defaultCluster,
            },
          };
        }),
        fieldInvalid: send("fieldInvalid"),
        setName: assign((context, { name }) => {
          if (context.creationError === "name-taken") {
            return {
              form: { ...context.form, name },
              creationError: undefined,
            };
          }
          return { form: { ...context.form, name } };
        }),
        setCluster: assign((context, { cluster }) => {
          return {
            form: {
              cluster,
            },
            sizes: undefined,
          };
        }),
        setSize: assign((context, { size }) => ({
          form: {
            ...context.form,
            size,
          },
        })),
        setSizes: assign((context, event) => {
          const sizes = event.data;
          const smallestSize = sizes.sort((a, b) => a.quota - b.quota)[0];
          return {
            sizes,
            form: {
              ...context.form,
              size: smallestSize,
            },
          };
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resetCreationErrorMessage: assign((_context) => ({
          creationError: undefined,
        })),
        setCreationError: assign((_context, { error }) => {
          return {
            creationError: error,
          };
        }),
        triggerSave: sendParent((context) => {
          const form = context.form as Required<typeof context.form>;
          const data: CreateDedicatedKafkaFormData = {
            plan: "dedicated",
            name: form.name,
            cluster: form.cluster,
            sizeId: form.size.id,
            billing: "dedicated",
          };
          return {
            type: "save",
            data,
          };
        }),
        triggerSubmit: send("submit"),
        setBillingToPrepaid: assign((context) => {
          const form = { ...context.form };
          form.billing = "prepaid";
          return { form };
        }),
      },
      guards: {
        isOverQuota: ({ capabilities }) =>
          capabilities === undefined ||
          capabilities.instanceAvailability === "out-of-quota",
        isClusterUnavailable: ({ capabilities }) =>
          capabilities === undefined ||
          capabilities.instanceAvailability === "clusters-unavailable",
        nameIsEmpty: ({ form }) =>
          form.name === undefined || form.name.length === 0,
        nameIsValid: ({ form }) =>
          /^[a-z]([-a-z0-9]*[a-z0-9])?$/.test(form.name || ""),
        clusterIsValid: ({ form, capabilities }) => {
          const selectedCluster = capabilities?.availableClusters.find(
            (p) => p.id === form.cluster?.id
          );
          return (
            // must have loaded a list of providers
            (capabilities?.availableClusters || []).length > 0 &&
            // must have selected a provider
            selectedCluster !== undefined
          );
        },
        noCluster: ({ form }) => form.cluster === undefined,
        noSizes: ({ sizes }) => sizes === undefined,
        emptySizes: ({ sizes }) => sizes !== undefined && sizes.length === 0,
        sizeIsDisabled: ({ form, capabilities }) => {
          if (capabilities === undefined) return true;
          return form.size?.isDisabled === true;
        },
        billingRequiredButNotSelected: ({ form }, _, meta) => {
          if (meta.state.hasTag("noBilling")) {
            return false;
          }
          return form.billing === undefined;
        },
        sizeIsOverQuota: ({ form, capabilities }) => {
          if (capabilities === undefined || !form.size) return true;
          const availableQuota = capabilities.remainingDedicatedQuota;
          if (!availableQuota) return true;
          return form.size.quota > availableQuota;
        },
        didClusterChange: (context, event) =>
          context.form.cluster !== event.cluster,
        didSizeChange: (context, event) =>
          context.form.size?.id !== event.size.id,
      },
    }
  );
