import type { FunctionComponent } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Redirect, useLocation } from "react-router-dom";

export const RedirectOnGateError: FunctionComponent<{
  redirectUrl: string;
}> = ({ children, redirectUrl }) => {
  const { key } = useLocation();
  return (
    <ErrorBoundary
      resetKeys={[key]}
      fallbackRender={() => <Redirect to={redirectUrl} />}
    >
      {children}
    </ErrorBoundary>
  );
};
