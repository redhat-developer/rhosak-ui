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
    "error.platform.createDedicatedKafkaInstance.loading.fetching clusters:invocation[0]": {
      type: "error.platform.createDedicatedKafkaInstance.loading.fetching clusters:invocation[0]";
      data: unknown;
    };
    "error.platform.createDedicatedKafkaInstance.loading.quota.checking dedicated quota:invocation[0]": {
      type: "error.platform.createDedicatedKafkaInstance.loading.quota.checking dedicated quota:invocation[0]";
      data: unknown;
    };
    "error.platform.dedicatedPlanService": {
      type: "error.platform.dedicatedPlanService";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    checkDedicatedQuota: "done.invoke.createDedicatedKafkaInstance.loading.quota.checking dedicated quota:invocation[0]";
    createInstance: "done.invoke.createDedicatedKafkaInstance.dedicated plan.saving:invocation[0]";
    dedicatedPlan: "done.invoke.dedicatedPlanService";
    fetchClusters: "done.invoke.createDedicatedKafkaInstance.loading.fetching clusters:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services:
      | "checkDedicatedQuota"
      | "createInstance"
      | "dedicatedPlan"
      | "fetchClusters";
  };
  eventsCausingActions: {
    notifyCreateErrorToDedicatedPlan: "createError";
    setCapabilities:
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
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    "dedicated plan": "done.state.createDedicatedKafkaInstance.loading";
  };
  eventsCausingServices: {
    checkDedicatedQuota: "xstate.init";
    createInstance: "save";
    dedicatedPlan: "done.state.createDedicatedKafkaInstance.loading";
    fetchClusters: "";
  };
  matchesStates:
    | "complete"
    | "dedicated plan"
    | "dedicated plan.idle"
    | "dedicated plan.saving"
    | "loading"
    | "loading.fetching clusters"
    | "loading.quota"
    | "loading.quota.checking dedicated quota"
    | "loading.quota.dedicated"
    | "loading.ready"
    | "system unavailable"
    | {
        "dedicated plan"?: "idle" | "saving";
        loading?:
          | "fetching clusters"
          | "quota"
          | "ready"
          | { quota?: "checking dedicated quota" | "dedicated" };
      };
  tags: "dedicatedPlan" | "loading" | "saving" | "systemUnavailable";
}
