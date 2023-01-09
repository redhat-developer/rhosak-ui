import type { VoidFunctionComponent } from "react";
import { Route } from "react-router-dom";
import {
  CreateKafkaInstanceRoute,
  DeleteKafkaInstanceRoute,
  KafkaInstancesRoute,
} from "./routes";
import { ChangeOwnerRoute } from "./routes/ChangeOwnerRoute";
import {
  ControlPlaneDeleteInstancePath,
  ControlPlaneNewInstancePath,
  ControlPlaneRoutePath,
  ControlPlaneChangeOwnerPath
} from "./routesConsts";

export const ControlPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={ControlPlaneRoutePath} exact>
      <Route path={ControlPlaneNewInstancePath}>
        <CreateKafkaInstanceRoute instancesHref={"/kafkas"} />
      </Route>
      <Route path={ControlPlaneDeleteInstancePath}>
        <DeleteKafkaInstanceRoute instancesHref={"/kafkas"} />
      </Route>
      <KafkaInstancesRoute
        getUrlForInstance={(instance) => `/kafkas/${instance.id}/details`}
      />
      <Route path={ControlPlaneChangeOwnerPath}>
      <ChangeOwnerRoute instancesHref={"/kafkas"} />
    </Route>
    </Route>
      
  );
};
