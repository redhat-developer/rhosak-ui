import type { VoidFunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  CreateKafkaInstanceRoute,
  DeleteKafkaInstanceRoute,
  KafkaInstancesRoute,
} from "./routes";
import { ChangeOwnerRoute } from "./routes/ChangeOwnerRoute";
import { DedicatedClustersRoute } from "./routes/DedicatedClustersRoute";
import {
  DedicatedControlPlaneChangeOwnerPath,
  DedicatedControlPlaneClustersPath,
  DedicatedControlPlaneDeleteInstancePath,
  DedicatedControlPlaneNewInstancePath,
  DedicatedControlPlaneRoutePath,
  DedicatedControlPlaneRouteRoot,
} from "./routesConsts";

export const DedicatedControlPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={DedicatedControlPlaneRoutePath}>
      <Route path={DedicatedControlPlaneNewInstancePath}>
        <CreateKafkaInstanceRoute
          instancesHref={DedicatedControlPlaneRouteRoot}
        />
      </Route>
      <RedirectOnGateError redirectUrl={DedicatedControlPlaneRoutePath}>
        <Route path={DedicatedControlPlaneDeleteInstancePath}>
          <DeleteKafkaInstanceRoute
            instancesHref={DedicatedControlPlaneRouteRoot}
          />
        </Route>
        <Route path={DedicatedControlPlaneChangeOwnerPath}>
          <ChangeOwnerRoute instancesHref={DedicatedControlPlaneRouteRoot} />
        </Route>
      </RedirectOnGateError>

      <Switch>
        <Route path={DedicatedControlPlaneClustersPath}>
          <DedicatedClustersRoute />
        </Route>

        <Route path={DedicatedControlPlaneRoutePath} exact>
          <KafkaInstancesRoute
            activeSection={"dedicated"}
            instancesHref={DedicatedControlPlaneRouteRoot}
            dedicatedHref={DedicatedControlPlaneRouteRoot}
            clustersHref={DedicatedControlPlaneClustersPath}
            instanceSelectedHref={(id) =>
              `${DedicatedControlPlaneRouteRoot}/${id}`
            }
            instanceCreationHref={`${DedicatedControlPlaneRouteRoot}/create`}
            instanceDeletionHref={(id) =>
              `${DedicatedControlPlaneRouteRoot}/${id}/delete`
            }
            instanceChangeOwnerHref={(id) =>
              `${DedicatedControlPlaneRouteRoot}/${id}/change-owner`
            }
            getUrlForInstance={(instance) =>
              `${DedicatedControlPlaneRouteRoot}/${instance.id}/details`
            }
          />
        </Route>
      </Switch>
    </Route>
  );
};
