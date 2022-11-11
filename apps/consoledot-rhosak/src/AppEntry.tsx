import { getBaseName } from "@redhat-cloud-services/frontend-components-utilities/helpers";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import logger from "redux-logger";
import { I18nProvider } from "ui";
import App from "./App";
import { init } from "./store";

const AppEntry = () => (
  <Provider
    store={init(
      ...(process.env.NODE_ENV !== "production" ? [logger] : [])
    ).getStore()}
  >
    <I18nProvider>
      <Router basename={getBaseName(window.location.pathname)}>
        <App />
      </Router>
    </I18nProvider>
  </Provider>
);

export default AppEntry;
