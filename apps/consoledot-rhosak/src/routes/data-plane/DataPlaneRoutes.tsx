import { InvalidObject } from "@redhat-cloud-services/frontend-components";
import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ControlPlaneRouteRoot } from "../control-plane/routesConsts";
import { DataPlaneGate } from "./DataPlaneGate";
import {
  AclsRoute,
  ConsumerGroupsRoute,
  DashboardRoute,
  SettingsRoute,
  TopicConsumerGroupsRoute,
  TopicMessagesGroupsRoute,
  TopicPropertiesRoute,
  TopicSchemasRoute,
  TopicsRoute,
} from "./routes";

import { DataPlaneRoutePath } from "./routesConsts";
import { TopicGate } from "./TopicGate";

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
            <TopicGate
              instancesHref={"/kafkas"}
              instanceDetailsHref={(id) =>
                `${ControlPlaneRouteRoot}/${id}/details`
              }
            >
              <Switch>
                <Route
                  path={`${DataPlaneRoutePath}/topics/:topicName/consumer-groups`}
                  exact
                >
                  <TopicConsumerGroupsRoute
                    instancesHref={"/kafkas"}
                    instanceDetailsHref={(id) =>
                      `${ControlPlaneRouteRoot}/${id}/details`
                    }
                  />
                </Route>
                <Route
                  path={`${DataPlaneRoutePath}/topics/:topicName/messages`}
                  exact
                >
                  <TopicMessagesGroupsRoute
                    instancesHref={"/kafkas"}
                    instanceDetailsHref={(id) =>
                      `${ControlPlaneRouteRoot}/${id}/details`
                    }
                  />
                </Route>
                <Route
                  path={`${DataPlaneRoutePath}/topics/:topicName/properties`}
                  exact
                >
                  <TopicPropertiesRoute
                    instancesHref={"/kafkas"}
                    instanceDetailsHref={(id) =>
                      `${ControlPlaneRouteRoot}/${id}/details`
                    }
                  />
                </Route>
                <Route
                  path={`${DataPlaneRoutePath}/topics/:topicName/schemas`}
                  exact
                >
                  <TopicSchemasRoute
                    instancesHref={"/kafkas"}
                    instanceDetailsHref={(id) =>
                      `${ControlPlaneRouteRoot}/${id}/details`
                    }
                  />
                </Route>

                <Redirect
                  from={`${DataPlaneRoutePath}/topics/:topicName/`}
                  to={`${DataPlaneRoutePath}/topics/:topicName/consumer-groups`}
                  exact
                />
              </Switch>
            </TopicGate>
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
