import { addNotification } from "@redhat-cloud-services/frontend-components-notifications/redux";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import type { PageRoute } from "consoledot-containers";
import { KafkaInstancesContainer } from "consoledot-containers";
import type { VoidFunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { KafkaInstancesHeader } from "ui";
import { DataPlaneRoute } from "./index";

const ControlPlaneRoute: VoidFunctionComponent = () => {
  const dispatch = useDispatch();
  const { auth, appAction } = useChrome();
  const { path, url } = useRouteMatch();
  //
  // useEffect(() => {
  //   appAction("streams");
  // }, [appAction]);

  const handleNotification: PageRoute["sendNotification"] = (notification) => {
    dispatch(addNotification(notification));
  };

  return (
    <Switch>
      <Route
        path={`${path}/kafkas/:id`}
        render={() => (
          <>
            <KafkaInstancesHeader />
            <DataPlaneRoute />
          </>
        )}
      />

      <Route
        path={path}
        exact={true}
        render={() => (
          <>
            <KafkaInstancesHeader />
            <KafkaInstancesContainer
              accessToken={auth.getToken}
              basePath={"https://api.openshift.com"}
              sendNotification={handleNotification}
              getUrlForInstance={(instance) =>
                `${url}/kafkas/${instance.id}/dashboard`
              }
            />
          </>
        )}
      />
    </Switch>
  );
};

export default ControlPlaneRoute;
