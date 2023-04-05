// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.dedicatedPlanService": {
      type: "done.invoke.dedicatedPlanService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.trialPlanService": {
      type: "done.invoke.trialPlanService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.createDedicatedKafkaInstance.loading.fetching clusters:invocation[0]": {
      type: "error.platform.createDedicatedKafkaInstance.loading.fetching clusters:invocation[0]";
      data: unknown;
    };
    "error.platform.createDedicatedKafkaInstance.loading.quota.checking dedicated quota:invocation[0]": {
      type: "error.platform.createDedicatedKafkaInstance.loading.quota.checking dedicated quota:invocation[0]";
      data: unknown;
    };
    "error.platform.createDedicatedKafkaInstance.loading.quota.checking developer availability:invocation[0]": {
      type: "error.platform.createDedicatedKafkaInstance.loading.quota.checking developer availability:invocation[0]";
      data: unknown;
    };
    "error.platform.dedicatedPlanService": {
      type: "error.platform.dedicatedPlanService";
      data: unknown;
    };
    "error.platform.trialPlanService": {
      type: "error.platform.trialPlanService";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    checkDedicatedQuota: "done.invoke.createDedicatedKafkaInstance.loading.quota.checking dedicated quota:invocation[0]";
    checkDeveloperAvailability: "done.invoke.createDedicatedKafkaInstance.loading.quota.checking developer availability:invocation[0]";
    createInstance:
      | "done.invoke.createDedicatedKafkaInstance.dedicated plan.saving:invocation[0]"
      | "done.invoke.createDedicatedKafkaInstance.developer plan.saving:invocation[0]";
    dedicatedPlan: "done.invoke.dedicatedPlanService";
    fetchClusters: "done.invoke.createDedicatedKafkaInstance.loading.fetching clusters:invocation[0]";
    trialPlan: "done.invoke.trialPlanService";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services:
      | "checkDedicatedQuota"
      | "checkDeveloperAvailability"
      | "createInstance"
      | "dedicatedPlan"
      | "fetchClusters"
      | "trialPlan";
  };
  eventsCausingActions: {
    notifyCreateErrorToDedicatedPlan: "createError";
    notifyCreateErrorToTrialPlan: "createError";
    setAwsTrial: "";
    setCapabilities:
      | ""
      | "clusters available"
      | "clusters unavailable"
      | "error.platform.createDedicatedKafkaInstance.loading.fetching clusters:invocation[0]";
    setClusters: "clusters available";
    setClustersUnavailable:
      | "clusters unavailable"
      | "error.platform.createDedicatedKafkaInstance.loading.fetching clusters:invocation[0]";
    setDedicatedAvailable: "dedicated quota available";
    setDedicatedOutOfQuota: "out of dedicated quota";
    setDedicatedUnavailable:
      | "error.platform.createDedicatedKafkaInstance.loading.quota.checking dedicated quota:invocation[0]"
      | "no dedicated quota available";
    setDeveloperAvailable: "developer available";
    setDeveloperUnavailable:
      | "developer unavailable"
      | "error.platform.createDedicatedKafkaInstance.loading.quota.checking developer availability:invocation[0]";
    setDeveloperUsed: "developer used";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    "dedicated plan": "done.state.createDedicatedKafkaInstance.loading";
    "developer plan": "done.state.createDedicatedKafkaInstance.loading";
  };
  eventsCausingServices: {
    checkDedicatedQuota: "xstate.init";
    checkDeveloperAvailability: "no dedicated quota available";
    createInstance: "save";
    dedicatedPlan: "done.state.createDedicatedKafkaInstance.loading";
    fetchClusters: "";
    trialPlan: "done.state.createDedicatedKafkaInstance.loading";
  };
  matchesStates:
    | "complete"
    | "dedicated plan"
    | "dedicated plan.idle"
    | "dedicated plan.saving"
    | "developer plan"
    | "developer plan.idle"
    | "developer plan.saving"
    | "loading"
    | "loading.fetching clusters"
    | "loading.fetching providers"
    | "loading.quota"
    | "loading.quota.checking dedicated quota"
    | "loading.quota.checking developer availability"
    | "loading.quota.dedicated"
    | "loading.quota.developer"
    | "loading.ready"
    | "system unavailable"
    | {
        "dedicated plan"?: "idle" | "saving";
        "developer plan"?: "idle" | "saving";
        loading?:
          | "fetching clusters"
          | "fetching providers"
          | "quota"
          | "ready"
          | {
              quota?:
                | "checking dedicated quota"
                | "checking developer availability"
                | "dedicated"
                | "developer";
            };
      };
  tags:
    | "dedicatedPlan"
    | "developerPlan"
    | "loading"
    | "saving"
    | "systemUnavailable";
}
