import { InvalidObject } from "@redhat-cloud-services/frontend-components";
import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ControlPlaneRouteRoot } from "../control-plane/routesConsts";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  AclsRoute,
  ConsumerGroupDeleteRoute,
  ConsumerGroupResetOffsetRoute,
  ConsumerGroupsRoute,
  ConsumerGroupViewPartitionRoute,
  DashboardRoute,
  EditPermissionsRoute,
  ManagePermissionsRoute,
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

import { DataPlaneTopicRoutePath } from "./routesConsts";

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

const managePermissionsHref = (id: string) =>
  `${instanceDetailsHref(id)}/acls/select-account`;

const editPermissionsHref = (id: string, selectedAccount: string) =>
  `${instanceDetailsHref(
    id
  )}/acls/select-account/${selectedAccount}/edit-permissions`;

export const permissionsModalHref = (id: string) =>
  `${instanceDetailsHref(id)}/acls`;

export type DataPlaneRoutesProps = {
  root: string;
  instanceId: string;
};

export const DataPlaneRoutes: VoidFunctionComponent<DataPlaneRoutesProps> = ({
  root,
  instanceId,
}) => {
  return (
    <Route path={root}>
      <RedirectOnGateError redirectUrl={ControlPlaneRouteRoot}>
        <Switch>
          <Route path={`${root}/dashboard`} exact>
            <DashboardRoute instancesHref={ControlPlaneRouteRoot} />
          </Route>

          <Route path={`${root}/topics`} exact>
            <TopicsRoute instancesHref={ControlPlaneRouteRoot} />
          </Route>

          <Route path={`${root}/consumer-groups`} exact>
            <ConsumerGroupsRoute
              instancesHref={ControlPlaneRouteRoot}
              instanceDetailsHref={instanceDetailsHref}
              instanceTopicsHref={instanceTopicsHref}
              instanceConsumerGroupsHref={instanceConsumerGroupsHref}
            />
          </Route>

          <Route path={`${root}/acls`}>
            <Route path={`${root}/acls/select-account`}>
              <ManagePermissionsRoute
                instancesHref={ControlPlaneRouteRoot}
                managePermissionsHref={permissionsModalHref}
                editPermissionsHref={editPermissionsHref}
              />
            </Route>
            <Route
              path={`${root}/acls/select-account/:selectedAccount/edit-permissions`}
            >
              <EditPermissionsRoute
                instancesHref={ControlPlaneRouteRoot}
                managePermissionsHref={permissionsModalHref}
                editPermissionsHref={editPermissionsHref}
              />
            </Route>
            <AclsRoute
              instancesHref={ControlPlaneRouteRoot}
              managePermissionsHref={managePermissionsHref}
              editPermissionsHref={editPermissionsHref}
            />
          </Route>

          <Route path={`${root}/settings`} exact>
            <SettingsRoute instancesHref={ControlPlaneRouteRoot} />
          </Route>
          <Route path={`${root}/topics`}>
            <RedirectOnGateError redirectUrl={instanceTopicsHref(instanceId)}>
              <Switch>
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
                            instancesHref={ControlPlaneRouteRoot}
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
                            instancesHref={ControlPlaneRouteRoot}
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
                          instancesHref={ControlPlaneRouteRoot}
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
                          instancesHref={ControlPlaneRouteRoot}
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
                          instancesHref={ControlPlaneRouteRoot}
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
                    instancesHref={ControlPlaneRouteRoot}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                  />
                </Route>
                <Route path={`${root}/topics/:topicName/messages`} exact>
                  <TopicMessagesGroupsRoute
                    instancesHref={ControlPlaneRouteRoot}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                  />
                </Route>

                <Route path={`${root}/topics/:topicName/properties/edit`} exact>
                  <TopicEditPropertiesRoute
                    instancesHref={ControlPlaneRouteRoot}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                  />
                </Route>
                <Route path={`${root}/topics/:topicName/properties`}>
                  <Route path={`${root}/topics/:topicName/properties/delete`}>
                    <TopicDeleteRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      topicHref={topicHref}
                      updateTopicHref={updateTopicHref}
                      deleteTopicHref={deleteTopicHref}
                    />
                  </Route>
                  <TopicPropertiesRoute
                    instancesHref={ControlPlaneRouteRoot}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    topicHref={topicHref}
                    updateTopicHref={updateTopicHref}
                    deleteTopicHref={deleteTopicHref}
                  />
                </Route>
                <Route path={`${root}/topics/:topicName/schemas`} exact>
                  <TopicSchemasRoute
                    instancesHref={ControlPlaneRouteRoot}
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
                      instancesHref={ControlPlaneRouteRoot}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <Route
                    path={`${root}/consumer-groups/:consumerGroupId/view-partition/reset-offset`}
                  >
                    <ConsumerGroupResetOffsetRoute
                      instancesHref={ControlPlaneRouteRoot}
                      instanceTopicsHref={instanceTopicsHref}
                      instanceDetailsHref={instanceDetailsHref}
                      instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                      viewPartitionConsumerGroupHref={
                        viewPartitionConsumerGroupHref
                      }
                    />
                  </Route>
                  <ConsumerGroupViewPartitionRoute
                    instancesHref={ControlPlaneRouteRoot}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    viewPartitionConsumerGroupHref={
                      viewPartitionConsumerGroupHref
                    }
                  />
                </Route>
                <Route
                  path={`${root}/consumer-groups/:consumerGroupId/reset-offset`}
                >
                  <ConsumerGroupResetOffsetRoute
                    instancesHref={ControlPlaneRouteRoot}
                    instanceTopicsHref={instanceTopicsHref}
                    instanceDetailsHref={instanceDetailsHref}
                    instanceConsumerGroupsHref={instanceConsumerGroupsHref}
                    viewPartitionConsumerGroupHref={
                      viewPartitionConsumerGroupHref
                    }
                  />
                </Route>
                <Route path={`${root}/consumer-groups/:consumerGroupId/delete`}>
                  <ConsumerGroupDeleteRoute
                    instancesHref={ControlPlaneRouteRoot}
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
