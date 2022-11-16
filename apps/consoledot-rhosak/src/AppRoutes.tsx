import { Bullseye, Spinner } from "@patternfly/react-core";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ControlPlaneRoute } from "./routes";

export const AppRoutes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Switch>
      <Route path="/streams" component={ControlPlaneRoute} />
    </Switch>
  </Suspense>
);
