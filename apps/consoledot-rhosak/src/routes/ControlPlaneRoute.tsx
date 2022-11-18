import { addNotification } from "@redhat-cloud-services/frontend-components-notifications/redux";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import type { PageRoute } from "consoledot-containers";
import { KafkaInstancesContainer } from "consoledot-containers";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import type { KafkaInstance } from "ui";
import { ControlPlaneHeader, KafkaInstanceDrawer } from "ui";
import { DataPlaneRoute } from "./index";

const ControlPlaneRoute: VoidFunctionComponent = () => {
  const dispatch = useDispatch();
  const { auth } = useChrome();
  const { path, url } = useRouteMatch();
  const [selectedInstance, setSelectedInstance] = useState<
    KafkaInstance | undefined
  >(undefined);

  const handleNotification: PageRoute["sendNotification"] = (notification) => {
    dispatch(addNotification(notification));
  };

  return (
    <KafkaInstanceDrawer
      instance={selectedInstance}
      onClose={() => setSelectedInstance(undefined)}
    >
      <Switch>
        <Route
          path={`${path}/:name/:id`}
          render={() => <DataPlaneRoute instancesHref={url} />}
        />

        <Route
          path={path}
          exact={true}
          render={() => (
            <>
              <ControlPlaneHeader />
              <KafkaInstancesContainer
                accessToken={auth.getToken}
                basePath={"https://api.openshift.com"}
                sendNotification={handleNotification}
                getUrlForInstance={(instance) =>
                  `${url}/${instance.name}/${instance.id}/dashboard`
                }
                onDetails={setSelectedInstance}
              />
            </>
          )}
        />
      </Switch>
    </KafkaInstanceDrawer>
  );
};

export default ControlPlaneRoute;
