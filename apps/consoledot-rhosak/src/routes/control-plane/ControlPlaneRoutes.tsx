import type { VoidFunctionComponent } from "react";
import { Route } from "react-router-dom";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  CreateKafkaInstanceRoute,
  DeleteKafkaInstanceRoute,
  KafkaInstancesRoute,
  TermsAndConditionsRoute,
} from "./routes";
import { ChangeOwnerRoute } from "./routes/ChangeOwnerRoute";
import {
  ControlPlaneChangeOwnerPath,
  ControlPlaneDeleteInstancePath,
  ControlPlaneNewInstancePath,
  ControlPlaneRoutePath,
  ControlPlaneRouteRoot,
  ControlPlaneTermsAndConditionsPath,
} from "./routesConsts";

export const ControlPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={ControlPlaneRoutePath} exact>
      <Route path={ControlPlaneTermsAndConditionsPath}>
        <TermsAndConditionsRoute
          createHref={ControlPlaneNewInstancePath}
          cancelHref={ControlPlaneRouteRoot}
        />
      </Route>
      <RedirectOnGateError redirectUrl={ControlPlaneTermsAndConditionsPath}>
        <Route path={ControlPlaneNewInstancePath}>
          <CreateKafkaInstanceRoute instancesHref={ControlPlaneRouteRoot} />
        </Route>
      </RedirectOnGateError>
      <RedirectOnGateError redirectUrl={ControlPlaneRouteRoot}>
        <Route path={ControlPlaneDeleteInstancePath}>
          <DeleteKafkaInstanceRoute instancesHref={ControlPlaneRouteRoot} />
        </Route>
        <Route path={ControlPlaneChangeOwnerPath}>
          <ChangeOwnerRoute instancesHref={ControlPlaneRouteRoot} />
        </Route>
      </RedirectOnGateError>
      <KafkaInstancesRoute
        getUrlForInstance={(instance) => `/kafkas/${instance.id}/details`}
      />
    </Route>
  );
};
