import type { VoidFunctionComponent } from "react";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  CreateDedicatedKafkaInstanceRoute,
  DeleteKafkaInstanceRoute,
  TermsAndConditionsRoute,
} from "./routes";
import { ChangeOwnerRoute } from "./routes/ChangeOwnerRoute";
import { DedicatedKafkaInstancesRoute } from "./routes/DedicatedKafkaInstancesRoute";
import {
  DedicatedControlPlaneChangeOwnerMatch,
  DedicatedControlPlaneChangeOwnerRoutePath,
  DedicatedControlPlaneClustersPath,
  DedicatedControlPlaneDeleteInstanceMatch,
  DedicatedControlPlaneDeleteInstanceRoutePath,
  DedicatedControlPlaneNewInstanceMatch,
  DedicatedControlPlaneNewInstanceRoutePath,
  DedicatedControlPlaneRouteMatch,
  DedicatedControlPlaneRoutePath,
  DedicatedControlPlaneSelectedInstanceRoutePath,
  DedicatedControlPlaneTermsAndConditionsMatch,
} from "./routesConsts";

export const DedicatedControlPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={DedicatedControlPlaneRouteMatch} exact={true}>
      <Route path={DedicatedControlPlaneTermsAndConditionsMatch}>
        <TermsAndConditionsRoute
          createHref={DedicatedControlPlaneNewInstanceRoutePath}
          cancelHref={DedicatedControlPlaneRoutePath}
        />
      </Route>
      <Route path={DedicatedControlPlaneNewInstanceMatch}>
        <RedirectOnGateError
          redirectUrl={DedicatedControlPlaneTermsAndConditionsMatch}
        >
          <Suspense fallback={null}>
            <CreateDedicatedKafkaInstanceRoute
              instancesHref={DedicatedControlPlaneRoutePath}
              clustersHref={DedicatedControlPlaneClustersPath}
            />
          </Suspense>
          .
        </RedirectOnGateError>
      </Route>
      <RedirectOnGateError redirectUrl={DedicatedControlPlaneRoutePath}>
        <Route path={DedicatedControlPlaneDeleteInstanceMatch}>
          <DeleteKafkaInstanceRoute
            instancesHref={DedicatedControlPlaneRoutePath}
          />
        </Route>
        <Route path={DedicatedControlPlaneChangeOwnerMatch}>
          <ChangeOwnerRoute instancesHref={DedicatedControlPlaneRoutePath} />
        </Route>
      </RedirectOnGateError>

      <DedicatedKafkaInstancesRoute
        activeSection={"instances"}
        instancesHref={DedicatedControlPlaneRoutePath}
        clustersHref={DedicatedControlPlaneClustersPath}
        instanceSelectedHref={DedicatedControlPlaneSelectedInstanceRoutePath}
        instanceCreationHref={DedicatedControlPlaneNewInstanceRoutePath}
        instanceDeletionHref={DedicatedControlPlaneDeleteInstanceRoutePath}
        instanceChangeOwnerHref={DedicatedControlPlaneChangeOwnerRoutePath}
        getUrlForInstance={(instance) =>
          `${DedicatedControlPlaneRoutePath}/${instance.id}/details`
        }
      />
    </Route>
  );
};
