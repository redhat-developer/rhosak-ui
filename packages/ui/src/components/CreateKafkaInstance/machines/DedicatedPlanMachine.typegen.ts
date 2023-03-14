// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.dedicatedPlanMachine.configuring.fields.size.loading:invocation[0]": {
      type: "done.invoke.dedicatedPlanMachine.configuring.fields.size.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.dedicatedPlanMachine.configuring.fields.size.loading:invocation[0]": {
      type: "error.platform.dedicatedPlanMachine.configuring.fields.size.loading:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getSizes: "done.invoke.dedicatedPlanMachine.configuring.fields.size.loading:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: "getSizes";
  };
  eventsCausingActions: {
    fieldInvalid:
      | ""
      | "error.platform.dedicatedPlanMachine.configuring.fields.size.loading:invocation[0]";
    resetCreationErrorMessage:
      | "done.state.dedicatedPlanMachine.configuring.fields"
      | "submit";
    setBillingToPrepaid: "";
    setCluster: "clusterChange";
    setCreationError: "createError";
    setInitialContext: "xstate.init";
    setName: "nameChange";
    setSize: "sizeChange";
    setSizes: "done.invoke.dedicatedPlanMachine.configuring.fields.size.loading:invocation[0]";
    triggerSave: "submit";
    triggerSubmit: "create";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    billingRequiredButNotSelected: "";
    clusterIsValid: "";
    didClusterChange: "clusterChange";
    didSizeChange: "sizeChange";
    emptySizes: "";
    isClusterUnavailable: "";
    isOverQuota: "";
    nameIsEmpty: "";
    nameIsValid: "";
    noCluster: "";
    noSizes: "";
    sizeIsDisabled: "";
    sizeIsOverQuota: "";
  };
  eventsCausingServices: {
    getSizes: "";
  };
  matchesStates:
    | "clusterUnavailable"
    | "configuring"
    | "configuring.fields"
    | "configuring.fields.billing"
    | "configuring.fields.billing.prepaidOnly"
    | "configuring.fields.billing.validate"
    | "configuring.fields.cluster"
    | "configuring.fields.cluster.invalid"
    | "configuring.fields.cluster.valid"
    | "configuring.fields.cluster.validate"
    | "configuring.fields.name"
    | "configuring.fields.name.empty"
    | "configuring.fields.name.invalid"
    | "configuring.fields.name.valid"
    | "configuring.fields.name.validate"
    | "configuring.fields.size"
    | "configuring.fields.size.disabled"
    | "configuring.fields.size.error"
    | "configuring.fields.size.idle"
    | "configuring.fields.size.loading"
    | "configuring.fields.size.overQuota"
    | "configuring.fields.size.valid"
    | "configuring.fields.size.validate"
    | "configuring.fields.size.waitingForQuota"
    | "configuring.form"
    | "configuring.form.invalid"
    | "configuring.form.saved"
    | "configuring.form.saving"
    | "configuring.form.valid"
    | "configuring.status"
    | "configuring.status.submitted"
    | "configuring.status.submitting"
    | "configuring.status.unsubmitted"
    | "overQuota"
    | "saved"
    | "verifyAvailability"
    | {
        configuring?:
          | "fields"
          | "form"
          | "status"
          | {
              fields?:
                | "billing"
                | "cluster"
                | "name"
                | "size"
                | {
                    billing?: "prepaidOnly" | "validate";
                    cluster?: "invalid" | "valid" | "validate";
                    name?: "empty" | "invalid" | "valid" | "validate";
                    size?:
                      | "disabled"
                      | "error"
                      | "idle"
                      | "loading"
                      | "overQuota"
                      | "valid"
                      | "validate"
                      | "waitingForQuota";
                  };
              form?: "invalid" | "saved" | "saving" | "valid";
              status?: "submitted" | "submitting" | "unsubmitted";
            };
      };
  tags:
    | "billingValid"
    | "blocked"
    | "clusterInvalid"
    | "clusterValid"
    | "configurable"
    | "creatable"
    | "formInvalid"
    | "formSaving"
    | "nameEmpty"
    | "nameInvalid"
    | "nameValid"
    | "noBilling"
    | "sizeDisabled"
    | "sizeError"
    | "sizeIdle"
    | "sizeLoading"
    | "sizeOverQuota"
    | "sizeValid"
    | "sizeWaitingForQuota"
    | "submitted"
    | "unsubmitted";
}
