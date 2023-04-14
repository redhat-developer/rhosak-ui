// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.DedicatedTrialPlanMachine.configuring.fields.size.loading:invocation[0]": {
      type: "done.invoke.DedicatedTrialPlanMachine.configuring.fields.size.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.DedicatedTrialPlanMachine.configuring.fields.size.loading:invocation[0]": {
      type: "error.platform.DedicatedTrialPlanMachine.configuring.fields.size.loading:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getSizes: "done.invoke.DedicatedTrialPlanMachine.configuring.fields.size.loading:invocation[0]";
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
      | "error.platform.DedicatedTrialPlanMachine.configuring.fields.size.loading:invocation[0]";
    resetCreationErrorMessage:
      | "done.state.DedicatedTrialPlanMachine.configuring.fields"
      | "submit";
    setCreationError: "createError";
    setInitialContext: "xstate.init";
    setName: "nameChange";
    setProvider: "providerChange";
    setRegion: "regionChange";
    setSizes: "done.invoke.DedicatedTrialPlanMachine.configuring.fields.size.loading:invocation[0]";
    triggerSave: "submit";
    triggerSubmit: "create";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    didProviderChange: "providerChange";
    didRegionChange: "regionChange";
    emptySizes: "";
    isTrialUnavailable: "";
    isTrialUsed: "";
    nameIsEmpty: "";
    nameIsValid: "";
    noProviderAndRegion: "";
    noSizes: "";
    providerIsValid: "";
    regionIsValid: "";
  };
  eventsCausingServices: {
    getSizes: "";
  };
  matchesStates:
    | "configuring"
    | "configuring.fields"
    | "configuring.fields.name"
    | "configuring.fields.name.empty"
    | "configuring.fields.name.invalid"
    | "configuring.fields.name.valid"
    | "configuring.fields.name.validate"
    | "configuring.fields.provider"
    | "configuring.fields.provider.invalid"
    | "configuring.fields.provider.valid"
    | "configuring.fields.provider.validate"
    | "configuring.fields.region"
    | "configuring.fields.region.invalid"
    | "configuring.fields.region.valid"
    | "configuring.fields.region.validate"
    | "configuring.fields.size"
    | "configuring.fields.size.error"
    | "configuring.fields.size.idle"
    | "configuring.fields.size.loading"
    | "configuring.fields.size.valid"
    | "configuring.fields.size.validate"
    | "configuring.form"
    | "configuring.form.invalid"
    | "configuring.form.saved"
    | "configuring.form.saving"
    | "configuring.form.valid"
    | "configuring.status"
    | "configuring.status.submitted"
    | "configuring.status.submitting"
    | "configuring.status.unsubmitted"
    | "regionsUnavailable"
    | "saved"
    | "trialUnavailable"
    | "trialUsed"
    | "verifyAvailability"
    | {
        configuring?:
          | "fields"
          | "form"
          | "status"
          | {
              fields?:
                | "name"
                | "provider"
                | "region"
                | "size"
                | {
                    name?: "empty" | "invalid" | "valid" | "validate";
                    provider?: "invalid" | "valid" | "validate";
                    region?: "invalid" | "valid" | "validate";
                    size?: "error" | "idle" | "loading" | "valid" | "validate";
                  };
              form?: "invalid" | "saved" | "saving" | "valid";
              status?: "submitted" | "submitting" | "unsubmitted";
            };
      };
  tags:
    | "blocked"
    | "configurable"
    | "formInvalid"
    | "formSaving"
    | "nameEmpty"
    | "nameInvalid"
    | "nameValid"
    | "providerInvalid"
    | "providerValid"
    | "regionInvalid"
    | "regionValid"
    | "sizeError"
    | "sizeIdle"
    | "sizeLoading"
    | "sizeValid"
    | "submitted"
    | "unsubmitted";
}
