import { Bullseye, Spinner } from "@patternfly/react-core";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ControlPlaneRoute } from "./routes";

export const AppRoutes = () => (
  <Switch>
    <Route
      path="/streams"
      render={() => (
        <Suspense
          fallback={
            <Bullseye>
              <Spinner />
            </Bullseye>
          }
        >
          <ControlPlaneRoute />
        </Suspense>
      )}
    />
  </Switch>
);
