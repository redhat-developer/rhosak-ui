import { addNotification } from "@redhat-cloud-services/frontend-components-notifications/redux";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import type { PageRoute } from "pages";
import { KafkaInstancesPage } from "pages";
import type { VoidFunctionComponent } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

const KafkaInstancesRoute: VoidFunctionComponent = () => {
  const dispatch = useDispatch();
  const { auth, appAction } = useChrome();

  useEffect(() => {
    appAction("streams");
  }, [appAction]);

  const handleNotification: PageRoute["sendNotification"] = (notification) => {
    dispatch(addNotification(notification));
  };

  return (
    <KafkaInstancesPage
      accessToken={auth.getToken}
      basePath={"https://api.openshift.com"}
      sendNotification={handleNotification}
    />
  );
};

export default withRouter(KafkaInstancesRoute);
