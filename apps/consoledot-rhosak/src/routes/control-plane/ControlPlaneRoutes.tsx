import type { VoidFunctionComponent } from "react";
import { Route } from "react-router-dom";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  CreateKafkaInstanceRoute,
  DeleteKafkaInstanceRoute,
  KafkaInstancesRoute,
} from "./routes";
import { ChangeOwnerRoute } from "./routes/ChangeOwnerRoute";
import {
  ControlPlaneChangeOwnerPath,
  ControlPlaneDeleteInstancePath,
  ControlPlaneNewInstancePath,
  ControlPlaneRoutePath,
  ControlPlaneRouteRoot,
} from "./routesConsts";

export const ControlPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={ControlPlaneRoutePath} exact>
      <Route path={ControlPlaneNewInstancePath}>
        <CreateKafkaInstanceRoute instancesHref={ControlPlaneRouteRoot} />
      </Route>
      <RedirectOnGateError redirectUrl={ControlPlaneRouteRoot}>
        <Route path={ControlPlaneDeleteInstancePath}>
          <DeleteKafkaInstanceRoute instancesHref={ControlPlaneRouteRoot} />
        </Route>
        <Route path={ControlPlaneChangeOwnerPath}>
          <ChangeOwnerRoute instancesHref={ControlPlaneRouteRoot} />
        </Route>
      </RedirectOnGateError>
      <KafkaInstancesRoute
        activeSection={"standard"}
        instancesHref={ControlPlaneRouteRoot}
        instanceSelectedHref={(id) => `${ControlPlaneRouteRoot}/${id}`}
        instanceCreationHref={`${ControlPlaneRouteRoot}/create`}
        instanceDeletionHref={(id) => `${ControlPlaneRouteRoot}/${id}/delete`}
        instanceChangeOwnerHref={(id) =>
          `${ControlPlaneRouteRoot}/${id}/change-owner`
        }
        getUrlForInstance={(instance) =>
          `${ControlPlaneRouteRoot}/${instance.id}/details`
        }
      />
    </Route>
  );
};
