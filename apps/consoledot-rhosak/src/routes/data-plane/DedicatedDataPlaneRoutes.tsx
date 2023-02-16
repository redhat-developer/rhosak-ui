import { InvalidObject } from "@redhat-cloud-services/frontend-components";
import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { DedicatedControlPlaneRouteRoot } from "../control-plane/routesConsts";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  AclsRoute,
  ConsumerGroupDeleteRoute,
  ConsumerGroupResetOffsetRoute,
  ConsumerGroupsRoute,
  ConsumerGroupViewPartitionRoute,
  DashboardRoute,
  SettingsRoute,
  TopicConsumerGroupDeleteRoute,
  TopicConsumerGroupResetOffsetRoute,
  TopicConsumerGroupsRoute,
  TopicConsumerGroupViewPartitionRoute,
  TopicDeleteRoute,
  TopicEditPropertiesRoute,
  TopicMessagesGroupsRoute,
  TopicPropertiesRoute,
  TopicSchemasRoute,
  TopicsRoute,
} from "./routes";

import {
  DedicatedDataPlaneRoutePath,
  DedicatedDataPlaneTopicRoutePath,
} from "./routesConsts";

const instanceDetailsHref = (id: string) =>
  `${DedicatedControlPlaneRouteRoot}/${id}/details`;

const instanceTopicsHref = (id: string) =>
  `${DedicatedControlPlaneRouteRoot}/${id}/details/topics`;

const topicHref = (id: string, topic: string) =>
  `${instanceDetailsHref(id)}/topics/${topic}/properties`;

const updateTopicHref = (id: string, topic: string) =>
  `${topicHref(id, topic)}/edit`;

const deleteTopicHref = (id: string, topic: string) =>
  `${topicHref(id, topic)}/delete`;

const instanceConsumerGroupsHref = (id: string) =>
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

export const DedicatedDataPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={DedicatedDataPlaneRoutePath}>
      <RedirectOnGateError redirectUrl={DedicatedControlPlaneRouteRoot}>
        <Switch>
          <Route path={`${DedicatedDataPlaneRoutePath}/dashboard`} exact>
            <DashboardRoute instancesHref={DedicatedControlPlaneRouteRoot} />
          </Route>

          <Route path={`${DedicatedDataPlaneRoutePath}/topics`} exact>
            <TopicsRoute instancesHref={DedicatedControlPlaneRouteRoot} />
          </Route>

          <Route path={`${DedicatedDataPlaneRoutePath}/consumer-groups`} exact>
            <ConsumerGroupsRoute
              instancesHref={DedicatedControlPlaneRouteRoot}
              instanceConsumerGroupsHref={instanceConsumerGroupsHref}
              instanceDetailsHref={instanceDetailsHref}
              instanceTopicsHref={instanceTopicsHref}
            />
          </Route>
          <Route path={`${DedicatedDataPlaneRoutePath}/acls`} exact>
            <AclsRoute instancesHref={DedicatedControlPlaneRouteRoot} />
          </Route>

          <Route path={`${DedicatedDataPlaneRoutePath}/settings`} exact>
            <SettingsRoute instancesHref={DedicatedControlPlaneRouteRoot} />
          </Route>
          <Route
            path={`${DedicatedDataPlaneRoutePath}/topics`}
            render={({ match }) => (
              <RedirectOnGateError
                redirectUrl={instanceTopicsHref(match.params.id)}
              >
                <Switch>
                  <Route
                    path={`${DedicatedDataPlaneRoutePath}/topics/:topicName/consumer-groups`}
                  >
                    <RedirectOnGateError
                      redirectUrl={instanceTopicsHref(match.params.id)}
                    >
                      <Switch>
                        <Route
                          path={`${DedicatedDataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/view-partition`}
                        >
                          <Route
                            path={`${DedicatedDataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/view-partition/delete`}
                          >
                            <TopicConsumerGroupDeleteRoute
                              instancesHref={DedicatedControlPlaneRouteRoot}
                              instanceTopicConsumerGroupsHref={
                                instanceTopicConsumerGroupHref
                              }
                              viewTopicPartitionConsumerGroupHref={
                                viewTopicPartitionConsumerGroupHref
                              }
                              instanceDetailsHref={instanceDetailsHref}
                              instanceTopicsHref={instanceTopicsHref}
                              instanceConsumerGroupsHref={
                                instanceConsumerGroupsHref
                              }
                            />
                          </Route>
                          <Route
                            path={`${DedicatedDataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/view-partition/reset-offset`}
                          >
                            <TopicConsumerGroupResetOffsetRoute
                              instancesHref={DedicatedControlPlaneRouteRoot}
                              instanceTopicConsumerGroupsHref={
                                instanceTopicConsumerGroupHref
                              }
                              viewTopicPartitionConsumerGroupHref={
                                viewTopicPartitionConsumerGroupHref
                              }
                              instanceDetailsHref={instanceDetailsHref}
                              instanceTopicsHref={instanceTopicsHref}
                              instanceConsumerGroupsHref={
                                instanceConsumerGroupsHref
                              }
                            />
                          </Route>
                          <TopicConsumerGroupViewPartitionRoute
                            instancesHref={DedicatedControlPlaneRouteRoot}
                            instanceTopicConsumerGroupsHref={
                              instanceTopicConsumerGroupHref
                            }
                            viewTopicPartitionConsumerGroupHref={
                              viewTopicPartitionConsumerGroupHref
                            }
                            instanceDetailsHref={instanceDetailsHref}
                            instanceTopicsHref={instanceTopicsHref}
                            instanceConsumerGroupsHref={
                              instanceConsumerGroupsHref
                            }
                          />
                        </Route>
                        <Route
                          path={`${DedicatedDataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/reset-offset`}
                        >
                          <TopicConsumerGroupResetOffsetRoute
                            instancesHref={DedicatedControlPlaneRouteRoot}
                            instanceTopicConsumerGroupsHref={
                              instanceTopicConsumerGroupHref
                            }
                            viewTopicPartitionConsumerGroupHref={
                              viewTopicPartitionConsumerGroupHref
                            }
                            instanceDetailsHref={instanceDetailsHref}
                            instanceTopicsHref={instanceTopicsHref}
                            instanceConsumerGroupsHref={
                              instanceConsumerGroupsHref
                            }
                          />
                        </Route>
                        <Route
                          path={`${DedicatedDataPlaneTopicRoutePath}/consumer-groups/:consumerGroupId/delete`}
                        >
                          <TopicConsumerGroupDeleteRoute
                            instancesHref={DedicatedControlPlaneRouteRoot}
                            instanceTopicConsumerGroupsHref={
                              instanceTopicConsumerGroupHref
                            }
                            viewTopicPartitionConsumerGroupHref={
                              viewTopicPartitionConsumerGroupHref
                            }
                            instanceDetailsHref={instanceDetailsHref}
                            instanceTopicsHref={instanceTopicsHref}
                            instanceConsumerGroupsHref={
                              instanceConsumerGroupsHref
                            }
                          />
                        </Route>
                      </Switch>
                    </RedirectOnGateError>
                    <TopicConsumerGroupsRoute
                      instancesHref={DedicatedControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    />
                  </Route>
                  <Route
                    path={`${DedicatedDataPlaneRoutePath}/topics/:topicName/messages`}
                    exact
                  >
                    <TopicMessagesGroupsRoute
                      instancesHref={DedicatedControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    />
                  </Route>

                  <Route
                    path={`${DedicatedDataPlaneRoutePath}/topics/:topicName/properties/edit`}
                    exact
                  >
                    <TopicEditPropertiesRoute
                      instancesHref={DedicatedControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    />
                  </Route>
                  <Route
                    path={`${DedicatedDataPlaneRoutePath}/topics/:topicName/properties`}
                  >
                    <Route
                      path={`${DedicatedDataPlaneRoutePath}/topics/:topicName/properties/delete`}
                    >
                      <TopicDeleteRoute
                        instancesHref={DedicatedControlPlaneRouteRoot}
                        instanceDetailsHref={instanceDetailsHref}
                        instanceTopicsHref={instanceTopicsHref}
                        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                        topicHref={topicHref}
                        updateTopicHref={updateTopicHref}
                        deleteTopicHref={deleteTopicHref}
                      />
                    </Route>
                    <TopicPropertiesRoute
                      instancesHref={DedicatedControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      topicHref={topicHref}
                      updateTopicHref={updateTopicHref}
                      deleteTopicHref={deleteTopicHref}
                    />
                  </Route>
                  <Route
                    path={`${DedicatedDataPlaneRoutePath}/topics/:topicName/schemas`}
                    exact
                  >
                    <TopicSchemasRoute
                      instancesHref={DedicatedControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    />
                  </Route>
                  <Redirect
                    from={`${DedicatedDataPlaneRoutePath}/topics/:topicName/`}
                    to={`${DedicatedDataPlaneRoutePath}/topics/:topicName/consumer-groups`}
                    exact
                  />
                </Switch>
              </RedirectOnGateError>
            )}
          />
          <Route
            path={`${DedicatedDataPlaneRoutePath}/consumer-groups`}
            render={({ match }) => (
              <RedirectOnGateError
                redirectUrl={instanceConsumerGroupsHref(match.params.id)}
              >
                <Switch>
                  <Route
                    path={`${DedicatedDataPlaneRoutePath}/consumer-groups/:consumerGroupId/view-partition`}
                  >
                    <Route
                      path={`${DedicatedDataPlaneRoutePath}/consumer-groups/:consumerGroupId/view-partition/delete`}
                    >
                      <ConsumerGroupDeleteRoute
                        instancesHref={DedicatedControlPlaneRouteRoot}
                        instanceTopicsHref={instanceTopicsHref}
                        instanceDetailsHref={instanceDetailsHref}
                        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                        viewPartitionConsumerGroupHref={
                          viewPartitionConsumerGroupHref
                        }
                      />
                    </Route>
                    <Route
                      path={`${DedicatedDataPlaneRoutePath}/consumer-groups/:consumerGroupId/view-partition/reset-offset`}
                    >
                      <ConsumerGroupResetOffsetRoute
                        instancesHref={DedicatedControlPlaneRouteRoot}
                        instanceTopicsHref={instanceTopicsHref}
                        instanceDetailsHref={instanceDetailsHref}
                        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                        viewPartitionConsumerGroupHref={
                          viewPartitionConsumerGroupHref
                        }
                      />
                    </Route>
                    <ConsumerGroupViewPartitionRoute
                      instancesHref={DedicatedControlPlaneRouteRoot}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <Route
                    path={`${DedicatedDataPlaneRoutePath}/consumer-groups/:consumerGroupId/reset-offset`}
                  >
                    <ConsumerGroupResetOffsetRoute
                      instancesHref={DedicatedControlPlaneRouteRoot}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <Route
                    path={`${DedicatedDataPlaneRoutePath}/consumer-groups/:consumerGroupId/delete`}
                  >
                    <ConsumerGroupDeleteRoute
                      instancesHref={DedicatedControlPlaneRouteRoot}
                      instanceTopicsHref={instanceTopicsHref}
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
            from={`${DedicatedDataPlaneRoutePath}`}
            to={`${DedicatedDataPlaneRoutePath}/dashboard`}
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
