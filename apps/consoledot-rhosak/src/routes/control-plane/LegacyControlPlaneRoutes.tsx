import type { VoidFunctionComponent } from "react";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  ChangeOwnerRoute,
  CreateKafkaInstanceRoute,
  DeleteKafkaInstanceRoute,
  KafkaInstancesRoute,
  TermsAndConditionsRoute,
} from "./routes";
import {
  ControlPlaneChangeOwnerMatch,
  ControlPlaneChangeOwnerRoutePath,
  ControlPlaneDeleteInstanceMatch,
  ControlPlaneDeleteInstanceRoutePath,
  ControlPlaneNewInstanceMatch,
  ControlPlaneNewInstanceRoutePath,
  ControlPlaneRoutePath,
  ControlPlaneRouteRoot,
  ControlPlaneSelectedInstanceRoutePath,
  ControlPlaneTermsAndConditionsMatch,
} from "./routesConsts";

export const LegacyControlPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={ControlPlaneRoutePath} exact>
      <Route path={ControlPlaneTermsAndConditionsMatch}>
        <TermsAndConditionsRoute
          createHref={ControlPlaneNewInstanceMatch}
          cancelHref={ControlPlaneRouteRoot}
        />
      </Route>
      <RedirectOnGateError redirectUrl={ControlPlaneTermsAndConditionsMatch}>
        <Suspense fallback={null}>
          <Route path={ControlPlaneNewInstanceMatch}>
            <CreateKafkaInstanceRoute instancesHref={ControlPlaneRouteRoot} />
          </Route>
        </Suspense>
      </RedirectOnGateError>
      <RedirectOnGateError redirectUrl={ControlPlaneRouteRoot}>
        <Route path={ControlPlaneDeleteInstanceMatch}>
          <DeleteKafkaInstanceRoute instancesHref={ControlPlaneRouteRoot} />
        </Route>
        <Route path={ControlPlaneChangeOwnerMatch}>
          <ChangeOwnerRoute instancesHref={ControlPlaneRouteRoot} />
        </Route>
      </RedirectOnGateError>
      <KafkaInstancesRoute
        instancesHref={ControlPlaneRoutePath}
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
