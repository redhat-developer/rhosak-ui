import { MetricsConnected } from "consoledot-containers";
import type { VoidFunctionComponent } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

export const DataPlaneRoute: VoidFunctionComponent = () => {
  const { path, url } = useRouteMatch();

  return (
    <>
      <div>horizontal nav</div>
      <Switch>
        <Route
          path={`${path}/dashboard`}
          exact={true}
          render={() => <MetricsConnected />}
        />
      </Switch>
    </>
  );
};

export default DataPlaneRoute;
