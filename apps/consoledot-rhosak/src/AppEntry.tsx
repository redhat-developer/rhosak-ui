import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { ApiProvider } from "consoledot-api";
import { memo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import logger from "redux-logger";
import { I18nProvider } from "ui";
import App from "./App";
import { AppProvider } from "./AppProvider";
import { init } from "./store";

const AppEntry = memo(() => {
  const chrome = useChrome();

  return (
    <Provider
      store={init(
        ...(process.env.NODE_ENV !== "production" ? [logger] : [])
      ).getStore()}
    >
      <ApiProvider
        accessToken={chrome.auth.getToken}
        basePath={"https://api.stage.openshift.com"}
      >
        <AppProvider>
          <Router basename={"/application-services"}>
            <I18nProvider lng={"en"}>
              <App />
            </I18nProvider>
          </Router>
        </AppProvider>
      </ApiProvider>
    </Provider>
  );
});

export default AppEntry;
