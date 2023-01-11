import { InvalidObject } from "@redhat-cloud-services/frontend-components";
import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ControlPlaneRouteRoot } from "../control-plane/routesConsts";
import { RedirectOnGateError } from "../RedirectOnGateError";
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
import { TopicDeleteRoute } from "./routes/TopicDeleteRoute";
import { TopicEditPropertiesRoute } from "./routes/TopicEditPropertiesRoute";

import { DataPlaneRoutePath } from "./routesConsts";

const instanceDetailsHref = (id: string) =>
  `${ControlPlaneRouteRoot}/${id}/details`;

const instanceTopicsHref = (id: string) =>
  `${ControlPlaneRouteRoot}/${id}/details/topics`;

const topicHref = (id: string, topic: string) =>
  `${instanceDetailsHref(id)}/topics/${topic}/properties`;

const updateTopicHref = (id: string, topic: string) =>
  `${topicHref(id, topic)}/edit`;

const deleteTopicHref = (id: string, topic: string) =>
  `${topicHref(id, topic)}/delete`;

export const DataPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={DataPlaneRoutePath}>
      <RedirectOnGateError redirectUrl={"/kafkas"}>
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

          <Route
            path={`${DataPlaneRoutePath}/topics`}
            render={({ match }) => (
              <RedirectOnGateError
                redirectUrl={instanceTopicsHref(match.params.id)}
              >
                <Switch>
                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/consumer-groups`}
                    exact
                  >
                    <TopicConsumerGroupsRoute
                      instancesHref={"/kafkas"}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/messages`}
                    exact
                  >
                    <TopicMessagesGroupsRoute
                      instancesHref={"/kafkas"}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                    />
                  </Route>

                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/properties/edit`}
                    exact
                  >
                    <TopicEditPropertiesRoute
                      instancesHref={"/kafkas"}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/properties`}
                  >
                    <Route
                      path={`${DataPlaneRoutePath}/topics/:topicName/properties/delete`}
                    >
                      <TopicDeleteRoute
                        instancesHref={"/kafkas"}
                        instanceDetailsHref={instanceDetailsHref}
                        instanceTopicsHref={instanceTopicsHref}
                        topicHref={topicHref}
                        updateTopicHref={updateTopicHref}
                        deleteTopicHref={deleteTopicHref}
                      />
                    </Route>
                    <TopicPropertiesRoute
                      instancesHref={"/kafkas"}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      topicHref={topicHref}
                      updateTopicHref={updateTopicHref}
                      deleteTopicHref={deleteTopicHref}
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/topics/:topicName/schemas`}
                    exact
                  >
                    <TopicSchemasRoute
                      instancesHref={"/kafkas"}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                    />
                  </Route>

                  <Redirect
                    from={`${DataPlaneRoutePath}/topics/:topicName/`}
                    to={`${DataPlaneRoutePath}/topics/:topicName/consumer-groups`}
                    exact
                  />
                </Switch>
              </RedirectOnGateError>
            )}
          />

          <Redirect
            from={`${DataPlaneRoutePath}`}
            to={`${DataPlaneRoutePath}/dashboard`}
            exact
          />

          <Route>
            <InvalidObject />
          </Route>
        </Switch>
      </RedirectOnGateError>
    </Route>
  );
};
