import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import logger from "redux-logger";
import { I18nProvider } from "ui";
import App from "./App";
import { init } from "./store";

const AppEntry = () => {
  return (
    <Provider
      store={init(
        ...(process.env.NODE_ENV !== "production" ? [logger] : [])
      ).getStore()}
    >
      <Router basename={"/application-services"}>
        <I18nProvider lng={"en"}>
          <App />
        </I18nProvider>
      </Router>
    </Provider>
  );
};

export default AppEntry;
