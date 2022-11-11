import { Bullseye, Spinner } from "@patternfly/react-core";
import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const KafkaInstancesRoutes = lazy(
  () =>
    import(
      /* webpackChunkName: "KafkaInstancesRoutes" */ "./KafkaInstancesRoute"
    )
);

/**
 * the Switch component changes routes depending on the path.
 *
 * Route properties:
 *      exact - path must match exactly,
 *      path - https://prod.foo.redhat.com:1337/insights/advisor/rules
 *      component - component to be rendered when a route has been chosen.
 */
export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Switch>
      <Route path="/streams" component={KafkaInstancesRoutes} />
    </Switch>
  </Suspense>
);
