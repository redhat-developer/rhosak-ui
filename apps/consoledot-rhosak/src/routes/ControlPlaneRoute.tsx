import {
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  PageSection,
} from "@patternfly/react-core";
import { addNotification } from "@redhat-cloud-services/frontend-components-notifications/redux";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import type { PageRoute } from "consoledot-containers";
import { KafkaInstancesContainer } from "consoledot-containers";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ControlPlaneHeader } from "ui";
import { DataPlaneRoute } from "./index";

const ControlPlaneRoute: VoidFunctionComponent = () => {
  const dispatch = useDispatch();
  const { auth } = useChrome();
  const { path, url } = useRouteMatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNotification: PageRoute["sendNotification"] = (notification) => {
    dispatch(addNotification(notification));
  };

  return (
    <Drawer isExpanded={isDrawerOpen}>
      <DrawerContent
        panelContent={
          <DrawerPanelContent>
            <DrawerHead>
              <DrawerActions>
                <DrawerCloseButton onClick={() => setIsDrawerOpen(false)} />
              </DrawerActions>
            </DrawerHead>
          </DrawerPanelContent>
        }
      >
        <DrawerContentBody
          className={"pf-u-display-flex pf-u-flex-direction-column"}
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
                  <PageSection isFilled={true}>
                    <KafkaInstancesContainer
                      accessToken={auth.getToken}
                      basePath={"https://api.openshift.com"}
                      sendNotification={handleNotification}
                      getUrlForInstance={(instance) =>
                        `${url}/${instance.name}/${instance.id}/dashboard`
                      }
                      onDetails={() => setIsDrawerOpen(true)}
                    />
                  </PageSection>
                </>
              )}
            />
          </Switch>
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ControlPlaneRoute;
