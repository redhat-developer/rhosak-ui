import { getBaseName } from "@redhat-cloud-services/frontend-components-utilities/helpers";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { ApiProvider } from "consoledot-api";
import { memo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import logger from "redux-logger";
import { I18nProvider } from "ui";
import App from "./App";
import { init } from "./store";

const store = init(
  ...(process.env.NODE_ENV !== "production" ? [logger] : [])
).getStore();

const AppEntry = memo(() => {
  const { auth } = useChrome();

  return (
    <Provider store={store}>
      <ApiProvider
        accessToken={auth.getToken}
        basePath={"https://api.openshift.com"}
        refetchInterval={5000}
      >
        <Router basename={getBaseName(window.location.pathname)}>
          <I18nProvider lng={"en"}>
            <App />
          </I18nProvider>
        </Router>
      </ApiProvider>
    </Provider>
  );
});

export default AppEntry;
