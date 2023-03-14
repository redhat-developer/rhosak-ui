import { InvalidObject } from "@redhat-cloud-services/frontend-components";
import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ControlPlaneRouteRoot } from "../control-plane/routesConsts";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  ConsumerGroupDeleteRoute,
  ConsumerGroupResetOffsetRoute,
  ConsumerGroupsRoute,
  ConsumerGroupViewPartitionRoute,
  DashboardRoute,
  PermissionsEditRoute,
  PermissionsRoute,
  PermissionsSelectAccountRoute,
  SettingsRoute,
  TopicConsumerGroupDeleteRoute,
  TopicConsumerGroupResetOffsetRoute,
  TopicConsumerGroupsRoute,
  TopicConsumerGroupViewPartitionRoute,
  TopicCreateRoute,
  TopicDeleteRoute,
  TopicEditPropertiesRoute,
  TopicMessagesGroupsRoute,
  TopicPropertiesRoute,
  TopicSchemasRoute,
  TopicsRoute,
} from "./routes";

import { DataPlaneTopicRoutePath } from "./routesConsts";

export type DataPlaneRoutesProps = {
  root: string;
  instancesHref: string;
  instanceId: string;
};

export const DataPlaneRoutes: VoidFunctionComponent<DataPlaneRoutesProps> = ({
  root,
  instancesHref,
  instanceId,
}) => {
  const instanceDetailsHref = (id: string) => `${instancesHref}/${id}/details`;

  const instanceTopicsHref = (id: string) =>
    `${instancesHref}/${id}/details/topics`;

  const topicPropertyHref = (id: string, topic: string) =>
    `${instanceDetailsHref(id)}/topics/${topic}/properties`;

  const topicHref = (id: string, topic: string) =>
    `${instanceDetailsHref(id)}/topics/${topic}`;

  const updateTopicHref = (id: string, topic: string) =>
    `${topicHref(id, topic)}/edit`;

  const deleteTopicHref = (id: string, topic: string) =>
    `${topicHref(id, topic)}/delete`;

  const instanceConsumerGroupsHref = (id: string) =>
    `${instanceDetailsHref(id)}/consumer-groups`;

  const viewPartitionConsumerGroupHref = (
    id: string,
    consumerGroupId: string
  ) =>
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

  const managePermissionsHref = (id: string) =>
    `${instanceDetailsHref(id)}/acls/select-account`;

  const editPermissionsHref = (id: string, selectedAccount: string) =>
    `${instanceDetailsHref(
      id
    )}/acls/select-account/${selectedAccount}/edit-permissions`;

  const permissionsModalHref = (id: string) =>
    `${instanceDetailsHref(id)}/acls`;

  return (
    <Route path={root}>
      <RedirectOnGateError redirectUrl={ControlPlaneRouteRoot}>
        <Switch>
          <Route path={`${root}/dashboard`} exact>
            <DashboardRoute instancesHref={instancesHref} />
          </Route>

          <Route path={`${root}/topics`} exact>
            <TopicsRoute instancesHref={instancesHref} />
          </Route>

          <Route path={`${root}/consumer-groups`} exact>
            <ConsumerGroupsRoute
              instancesHref={instancesHref}
              instanceDetailsHref={instanceDetailsHref}
              instanceTopicsHref={instanceTopicsHref}
              instanceConsumerGroupsHref={instanceConsumerGroupsHref}
            />
          </Route>

          <Route path={`${root}/acls`}>
            <Route path={`${root}/acls/select-account`}>
              <PermissionsSelectAccountRoute
                instancesHref={instancesHref}
                managePermissionsHref={permissionsModalHref}
                editPermissionsHref={editPermissionsHref}
              />
            </Route>
            <Route
              path={`${root}/acls/select-account/:selectedAccount/edit-permissions`}
            >
              <PermissionsEditRoute
                instancesHref={instancesHref}
                managePermissionsHref={permissionsModalHref}
                editPermissionsHref={editPermissionsHref}
              />
            </Route>
            <PermissionsRoute
              instancesHref={instancesHref}
              managePermissionsHref={managePermissionsHref}
              editPermissionsHref={editPermissionsHref}
            />
          </Route>

          <Route path={`${root}/settings`} exact>
            <SettingsRoute instancesHref={instancesHref} />
          </Route>
          <Route path={`${root}/topics`}>
            <RedirectOnGateError redirectUrl={instanceTopicsHref(instanceId)}>
              <Switch>
                <Route path={`${root}/topics/create-topic`} exact>
                  <TopicCreateRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                  />
                </Route>
                <Route path={`${root}/topics/:topicName/consumer-groups`}>
                  <RedirectOnGateError
                    redirectUrl={instanceTopicsHref(instanceId)}
                  >
                    <Switch>
                      <Route
                        path={`${DataPlaneTopicRoutePath(
                          root
                        )}/consumer-groups/:consumerGroupId/view-partition`}
                      >
                        <Route
                          path={`${DataPlaneTopicRoutePath(
                            root
                          )}/consumer-groups/:consumerGroupId/view-partition/delete`}
                        >
                          <TopicConsumerGroupDeleteRoute
                            instancesHref={instancesHref}
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
                          path={`${DataPlaneTopicRoutePath(
                            root
                          )}/consumer-groups/:consumerGroupId/view-partition/reset-offset`}
                        >
                          <TopicConsumerGroupResetOffsetRoute
                            instancesHref={instancesHref}
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
                          instancesHref={instancesHref}
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
                        path={`${DataPlaneTopicRoutePath(
                          root
                        )}/consumer-groups/:consumerGroupId/reset-offset`}
                      >
                        <TopicConsumerGroupResetOffsetRoute
                          instancesHref={instancesHref}
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
                        path={`${DataPlaneTopicRoutePath(
                          root
                        )}/consumer-groups/:consumerGroupId/delete`}
                      >
                        <TopicConsumerGroupDeleteRoute
                          instancesHref={instancesHref}
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
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                  />
                </Route>
                <Route path={`${root}/topics/:topicName/messages`} exact>
                  <TopicMessagesGroupsRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                  />
                </Route>

                <Route path={`${root}/topics/:topicName/properties/edit`} exact>
                  <TopicEditPropertiesRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                  />
                </Route>
                <Route path={`${root}/topics/:topicName/properties`}>
                  <Route path={`${root}/topics/:topicName/properties/delete`}>
                    <TopicDeleteRoute
                      instancesHref={instancesHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      topicHref={topicHref}
                      updateTopicHref={updateTopicHref}
                      deleteTopicHref={deleteTopicHref}
                    />
                  </Route>
                  <TopicPropertiesRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    topicHref={topicPropertyHref}
                    updateTopicHref={updateTopicHref}
                    deleteTopicHref={deleteTopicHref}
                  />
                </Route>
                <Route path={`${root}/topics/:topicName/schemas`} exact>
                  <TopicSchemasRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                  />
                </Route>
                <Route path={`${root}/topics/:topicName/delete`} exact>
                  <TopicDeleteRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    topicHref={topicHref}
                    updateTopicHref={updateTopicHref}
                    deleteTopicHref={deleteTopicHref}
                  />
                </Route>
                <Route path={`${root}/topics/:topicName/edit`} exact>
                  <TopicEditPropertiesRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                  />
                </Route>
                <Redirect
                  from={`${root}/topics/:topicName/`}
                  to={`${root}/topics/:topicName/consumer-groups`}
                  exact
                />
              </Switch>
            </RedirectOnGateError>
          </Route>
          <Route path={`${root}/consumer-groups`}>
            <RedirectOnGateError
              redirectUrl={instanceConsumerGroupsHref(instanceId)}
            >
              <Switch>
                <Route
                  path={`${root}/consumer-groups/:consumerGroupId/view-partition`}
                >
                  <Route
                    path={`${root}/consumer-groups/:consumerGroupId/view-partition/delete`}
                  >
                    <ConsumerGroupDeleteRoute
                      instancesHref={instancesHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <Route
                    path={`${root}/consumer-groups/:consumerGroupId/view-partition/reset-offset`}
                  >
                    <ConsumerGroupResetOffsetRoute
                      instancesHref={instancesHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <ConsumerGroupViewPartitionRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    viewPartitionConsumerGroupHref={
                      viewPartitionConsumerGroupHref
                    }
                  />
                </Route>
                <Route
                  path={`${root}/consumer-groups/:consumerGroupId/reset-offset`}
                >
                  <ConsumerGroupResetOffsetRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    viewPartitionConsumerGroupHref={
                      viewPartitionConsumerGroupHref
                    }
                  />
                </Route>
                <Route path={`${root}/consumer-groups/:consumerGroupId/delete`}>
                  <ConsumerGroupDeleteRoute
                    instancesHref={instancesHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    viewPartitionConsumerGroupHref={
                      viewPartitionConsumerGroupHref
                    }
                  />
                </Route>
              </Switch>
            </RedirectOnGateError>
          </Route>
          <Redirect from={`${root}`} to={`${root}/dashboard`} exact />

          <Route>
            <InvalidObject />
          </Route>
        </Switch>
      </RedirectOnGateError>
    </Route>
  );
};
