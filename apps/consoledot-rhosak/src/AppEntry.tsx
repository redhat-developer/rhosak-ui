import { getBaseName } from "@redhat-cloud-services/frontend-components-utilities/helpers";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { ApiProvider } from "consoledot-api";
import { memo, useLayoutEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import logger from "redux-logger";
import { I18nProvider, useXStateInspector } from "ui";
import App from "./App";
import { QuickstartLoader } from "./QuickstartLoader";
import { init } from "./store";

function apiUrlFromHostname() {
  if (window.location.hostname === "console.redhat.com") {
    return "https://api.openshift.com";
  }
  return "https://api.stage.openshift.com";
}

const apiUrl = process.env.API_URL || apiUrlFromHostname();

const store = init(
  ...(process.env.NODE_ENV !== "production" ? [logger] : [])
).getStore();

const AppEntry = memo(() => {
  const { auth } = useChrome();
  const XStateInspector = useXStateInspector();

  useLayoutEffect(() => {
    const el = document.querySelector<HTMLDivElement>(
      ".chr-scope__default-layout"
    );
    if (el) {
      el.style["overflow"] = "auto";
    }
  }, []);

  return (
    <Provider store={store}>
      <ApiProvider
        accessToken={async () => {
          const token = await auth.getToken();
          if (!token) {
            throw Error("No auth");
          }
          return token;
        }}
        basePath={apiUrl}
        refetchInterval={5000}
      >
        <Router basename={getBaseName(window.location.pathname)}>
          <I18nProvider lng={"en"}>
            <XStateInspector />
            <App />
          </I18nProvider>
        </Router>
        <QuickstartLoader />
      </ApiProvider>
    </Provider>
  );
});

export default AppEntry;
