
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.after(1000)#topicsMetrics.callApi.failure": { type: "xstate.after(1000)#topicsMetrics.callApi.failure" };
"xstate.after(1000)#topicsMetrics.initialLoading.failure": { type: "xstate.after(1000)#topicsMetrics.initialLoading.failure" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "api": "done.invoke.topicsMetrics.callApi.loading:invocation[0]" | "done.invoke.topicsMetrics.initialLoading.loading:invocation[0]" | "done.invoke.topicsMetrics.withResponse.refreshing:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "api";
        };
        eventsCausingActions: {
          "incrementRetries": "fetchFail";
"resetRetries": "refresh";
"setDuration": "selectDuration";
"setFetchTimestamp": "refresh" | "selectDuration" | "selectTopic" | "xstate.init";
"setMetrics": "fetchSuccess";
"setTopic": "selectTopic";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "canRetryFetching": "xstate.after(1000)#topicsMetrics.callApi.failure" | "xstate.after(1000)#topicsMetrics.initialLoading.failure";
"isJustCreated": "fetchSuccess";
        };
        eventsCausingServices: {
          "api": "refresh" | "selectDuration" | "selectTopic" | "xstate.after(1000)#topicsMetrics.callApi.failure" | "xstate.after(1000)#topicsMetrics.initialLoading.failure" | "xstate.init";
        };
        matchesStates: "callApi" | "callApi.failure" | "callApi.loading" | "criticalFail" | "initialLoading" | "initialLoading.failure" | "initialLoading.loading" | "justCreated" | "withResponse" | "withResponse.idle" | "withResponse.refreshing" | { "callApi"?: "failure" | "loading";
"initialLoading"?: "failure" | "loading";
"withResponse"?: "idle" | "refreshing"; };
        tags: "failed" | "initialLoading" | "justCreated" | "loading" | "refreshing" | "withResponse";
      }
  