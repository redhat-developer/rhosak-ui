import type { VoidFunctionComponent } from "react";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  ChangeOwnerRoute,
  CreateDedicatedKafkaInstanceRoute,
  DeleteKafkaInstanceRoute,
  TermsAndConditionsRoute,
} from "./routes";
import { DedicatedKafkaInstancesRoute } from "./routes/DedicatedKafkaInstancesRoute";
import {
  ControlPlaneChangeOwnerMatch,
  ControlPlaneChangeOwnerRoutePath,
  ControlPlaneClustersPath,
  ControlPlaneDeleteInstanceMatch,
  ControlPlaneDeleteInstanceRoutePath,
  ControlPlaneNewInstanceMatch,
  ControlPlaneNewInstanceRoutePath,
  ControlPlaneRouteMatch,
  ControlPlaneRoutePath,
  ControlPlaneSelectedInstanceRoutePath,
  ControlPlaneTermsAndConditionsMatch,
} from "./routesConsts";

export const DedicatedControlPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={ControlPlaneRouteMatch} exact={true}>
      <Route path={ControlPlaneTermsAndConditionsMatch}>
        <TermsAndConditionsRoute
          createHref={ControlPlaneNewInstanceRoutePath}
          cancelHref={ControlPlaneRoutePath}
        />
      </Route>

      <Route path={ControlPlaneNewInstanceMatch}>
        <RedirectOnGateError redirectUrl={ControlPlaneTermsAndConditionsMatch}>
          <Suspense fallback={null}>
            <CreateDedicatedKafkaInstanceRoute
              instancesHref={ControlPlaneRoutePath}
              clustersHref={ControlPlaneClustersPath}
            />
          </Suspense>
        </RedirectOnGateError>
      </Route>

      <RedirectOnGateError redirectUrl={ControlPlaneRoutePath}>
        <Route path={ControlPlaneDeleteInstanceMatch}>
          <DeleteKafkaInstanceRoute instancesHref={ControlPlaneRoutePath} />
        </Route>
        <Route path={ControlPlaneChangeOwnerMatch}>
          <ChangeOwnerRoute instancesHref={ControlPlaneRoutePath} />
        </Route>
      </RedirectOnGateError>

      <DedicatedKafkaInstancesRoute
        activeSection={"instances"}
        instancesHref={ControlPlaneRoutePath}
        clustersHref={ControlPlaneClustersPath}
        instanceSelectedHref={ControlPlaneSelectedInstanceRoutePath}
        instanceCreationHref={ControlPlaneNewInstanceRoutePath}
        instanceDeletionHref={ControlPlaneDeleteInstanceRoutePath}
        instanceChangeOwnerHref={ControlPlaneChangeOwnerRoutePath}
        getUrlForInstance={(instance) =>
          `${ControlPlaneRoutePath}/${instance.id}/details`
        }
      />
    </Route>
  );
};
