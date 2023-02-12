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
  ConsumerGroupDeleteRoute,
  ConsumerGroupResetOffsetRoute,
  ConsumerGroupViewPartitionRoute,
  TopicConsumerGroupDeleteRoute,
  TopicConsumerGroupResetOffsetRoute,
  TopicConsumerGroupViewPartitionRoute,
  TopicDeleteRoute,
  TopicEditPropertiesRoute,
} from "./routes";
import { ManagePermissionsRoute } from "./routes/ManagePermissionsRoute";

import { DataPlaneRoutePath, DataPlaneTopicRoutePath } from "./routesConsts";

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

export const instanceConsumerGroupsHref = (id: string) =>
  `${instanceDetailsHref(id)}/consumer-groups`;

const viewPartitionConsumerGroupHref = (id: string, consumerGroupId: string) =>
  `${instanceDetailsHref(
    id
  )}/consumer-groups/${consumerGroupId}/view-partition`;

const instanceTopicConsumerGroupHref = (id: string, topic: string) =>
  `${instanceDetailsHref(id)}/topics/${topic}/consumer-groups`;

const viewTopicPartitionConsumerGroupHref = (
  id: string,
  topic: string,
  consumerGroupId: string
) =>
  `${instanceDetailsHref(
    id
  )}/topics/${topic}/consumer-groups/${consumerGroupId}/view-partition`;
export const managePermissionsHref = (id: string) =>
  `${instanceDetailsHref(id)}/acls/manage-permissions`;

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

          <Route path={`${DataPlaneRoutePath}/acls/manage-permissions`} exact>
            <ManagePermissionsRoute
              instancesHref={"/kafkas"}
              managePermissionsHref={managePermissionsHref}
            />
          </Route>
          <Route path={`${DataPlaneRoutePath}/acls`} exact>
            <AclsRoute
              instancesHref={"/kafkas"}
              managePermissionsHref={managePermissionsHref}
            />
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
                  >
                    <RedirectOnGateError
                      redirectUrl={instanceTopicsHref(match.params.id)}
                    >
                      <Switch>
                        <Route
                          path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/view-partition`}
                        >
                          <Route
                            path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/view-partition/delete`}
                          >
                            <TopicConsumerGroupDeleteRoute
                              instancesHref={"/kafkas"}
                              instanceTopicConsumerGroupsHref={
                                instanceTopicConsumerGroupHref
                              }
                              viewTopicPartitionConsumerGroupHref={
                                viewTopicPartitionConsumerGroupHref
                              }
                              instanceDetailsHref={instanceDetailsHref}
                              instanceTopicsHref={instanceTopicsHref}
                            />
                          </Route>
                          <Route
                            path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/view-partition/reset-offset`}
                          >
                            <TopicConsumerGroupResetOffsetRoute
                              instancesHref={"/kafkas"}
                              instanceTopicConsumerGroupsHref={
                                instanceTopicConsumerGroupHref
                              }
                              viewTopicPartitionConsumerGroupHref={
                                viewTopicPartitionConsumerGroupHref
                              }
                              instanceDetailsHref={instanceDetailsHref}
                              instanceTopicsHref={instanceTopicsHref}
                            />
                          </Route>
                          <TopicConsumerGroupViewPartitionRoute
                            instancesHref={"/kafkas"}
                            instanceTopicConsumerGroupsHref={
                              instanceTopicConsumerGroupHref
                            }
                            viewTopicPartitionConsumerGroupHref={
                              viewTopicPartitionConsumerGroupHref
                            }
                            instanceDetailsHref={instanceDetailsHref}
                            instanceTopicsHref={instanceTopicsHref}
                          />
                        </Route>
                        <Route
                          path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/reset-offset`}
                        >
                          <TopicConsumerGroupResetOffsetRoute
                            instancesHref={"/kafkas"}
                            instanceTopicConsumerGroupsHref={
                              instanceTopicConsumerGroupHref
                            }
                            viewTopicPartitionConsumerGroupHref={
                              viewTopicPartitionConsumerGroupHref
                            }
                            instanceDetailsHref={instanceDetailsHref}
                            instanceTopicsHref={instanceTopicsHref}
                          />
                        </Route>
                        <Route
                          path={`${DataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/delete`}
                        >
                          <TopicConsumerGroupDeleteRoute
                            instancesHref={"/kafkas"}
                            instanceTopicConsumerGroupsHref={
                              instanceTopicConsumerGroupHref
                            }
                            viewTopicPartitionConsumerGroupHref={
                              viewTopicPartitionConsumerGroupHref
                            }
                            instanceDetailsHref={instanceDetailsHref}
                            instanceTopicsHref={instanceTopicsHref}
                          />
                        </Route>
                      </Switch>
                    </RedirectOnGateError>
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
          <Route
            path={`${DataPlaneRoutePath}/consumer-groups`}
            render={({ match }) => (
              <RedirectOnGateError
                redirectUrl={instanceConsumerGroupsHref(match.params.id)}
              >
                <Switch>
                  <Route
                    path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/view-partition`}
                  >
                    <Route
                      path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/view-partition/delete`}
                    >
                      <ConsumerGroupDeleteRoute
                        instancesHref={"/kafkas"}
                        instanceDetailsHref={instanceDetailsHref}
                        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                        viewPartitionConsumerGroupHref={
                          viewPartitionConsumerGroupHref
                        }
                      />
                    </Route>
                    <Route
                      path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/view-partition/reset-offset`}
                    >
                      <ConsumerGroupResetOffsetRoute
                        instancesHref={"/kafkas"}
                        instanceDetailsHref={instanceDetailsHref}
                        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                        viewPartitionConsumerGroupHref={
                          viewPartitionConsumerGroupHref
                        }
                      />
                    </Route>
                    <ConsumerGroupViewPartitionRoute
                      instancesHref={"/kafkas"}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/reset-offset`}
                  >
                    <ConsumerGroupResetOffsetRoute
                      instancesHref={"/kafkas"}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <Route
                    path={`${DataPlaneRoutePath}/consumer-groups/:consumerGroupId/delete`}
                  >
                    <ConsumerGroupDeleteRoute
                      instancesHref={"/kafkas"}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
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
