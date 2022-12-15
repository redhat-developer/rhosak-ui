import { InvalidObject } from "@redhat-cloud-services/frontend-components";
import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { DataPlaneRoutePath } from "../control-plane/routesConsts";
import { DataPlaneGate } from "./DataPlaneGate";
import { AclsRoute } from "./routes/AclsRoute";
import { ConsumerGroupsRoute } from "./routes/ConsumerGroupsRoute";
import { DashboardRoute } from "./routes/DashboardRoute";
import { SettingsRoute } from "./routes/SettingsRoute";
import { TopicsRoute } from "./routes/TopicsRoute";

export const DataPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={DataPlaneRoutePath}>
      <DataPlaneGate instancesHref={"/kafkas"}>
        <Switch>
          <Route path={`${DataPlaneRoutePath}/dashboard`} exact>
            <DashboardRoute instancesHref={"/kafkas"} />
          </Route>

          <Route path={`${DataPlaneRoutePath}/topics`} exact>
            <TopicsRoute instancesHref={"/kafkas"} />
          </Route>

          <Route path={`${DataPlaneRoutePath}/consumer-groups`} exact>
            <ConsumerGroupsRoute instancesHref={"/kafkas"} />
          </Route>

          <Route path={`${DataPlaneRoutePath}/acls`} exact>
            <AclsRoute instancesHref={"/kafkas"} />
          </Route>

          <Route path={`${DataPlaneRoutePath}/settings`} exact>
            <SettingsRoute instancesHref={"/kafkas"} />
          </Route>

          <Route path={`${DataPlaneRoutePath}/topics`} exact>
            <TopicsRoute instancesHref={"/kafkas"} />
          </Route>

          <Route path={`${DataPlaneRoutePath}/topics`}>
            <Switch>
              <Route path={`${DataPlaneRoutePath}/topics/:topicName`} exact>
                what
              </Route>
            </Switch>
          </Route>

          <Redirect
            from={`${DataPlaneRoutePath}`}
            to={`${DataPlaneRoutePath}/dashboard`}
            exact
          />

          <Route>
            <InvalidObject />
          </Route>
        </Switch>
      </DataPlaneGate>
    </Route>
  );
};
