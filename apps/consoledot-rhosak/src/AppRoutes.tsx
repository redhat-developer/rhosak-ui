import { Loading } from "@rhoas/app-services-ui-components";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ControlPlaneRoute } from "./routes";

export const AppRoutes = () => (
  <Switch>
    <Route
      path="/streams"
      render={() => (
        <Suspense fallback={<Loading />}>
          <ControlPlaneRoute />
        </Suspense>
      )}
    />
  </Switch>
);
