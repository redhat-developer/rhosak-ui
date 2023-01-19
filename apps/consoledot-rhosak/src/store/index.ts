import notificationsMiddleware from "@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware";
import type ReducerRegistry from "@redhat-cloud-services/frontend-components-utilities/ReducerRegistry";
import { getRegistry } from "@redhat-cloud-services/frontend-components-utilities/Registry";
import type { Middleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export let registry: ReducerRegistry<any>;

export function init(...middleware: Middleware[]) {
  registry = getRegistry({}, [
    promiseMiddleware,
    notificationsMiddleware({ errorDescriptionKey: ["detail", "stack"] }),
    ...middleware,
  ]);
  return registry;
}
