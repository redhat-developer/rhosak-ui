import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { ApiProvider } from "consoledot-api";
import { memo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import logger from "redux-logger";
import { I18nProvider } from "ui";
import App from "./App";
import { DrawerProvider } from "./DrawerProvider";
import { init } from "./store";

const store = init(
  ...(process.env.NODE_ENV !== "production" ? [logger] : [])
).getStore();

const AppEntry = memo(() => {
  const chrome = useChrome();

  return (
    <Provider store={store}>
      <ApiProvider
        accessToken={chrome.auth.getToken}
        basePath={"https://api.openshift.com"}
      >
        <Router basename={"/application-services"}>
          <DrawerProvider>
            <I18nProvider lng={"en"}>
              <App />
            </I18nProvider>
          </DrawerProvider>
        </Router>
      </ApiProvider>
    </Provider>
  );
});

export default AppEntry;
