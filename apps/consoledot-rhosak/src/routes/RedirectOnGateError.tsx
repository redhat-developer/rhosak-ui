import { useQueryErrorResetBoundary } from "consoledot-api/src";
import type { FunctionComponent, VoidFunctionComponent } from "react";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Redirect, useLocation } from "react-router-dom";

export const RedirectOnGateError: FunctionComponent<{
  redirectUrl: string;
}> = ({ children, redirectUrl }) => {
  const { key } = useLocation();

  return (
    <ErrorBoundary
      resetKeys={[key]}
      fallbackRender={() => <RedirectAndResetError redirectUrl={redirectUrl} />}
    >
      {children}
    </ErrorBoundary>
  );
};

const RedirectAndResetError: VoidFunctionComponent<{ redirectUrl: string }> = ({
  redirectUrl,
}) => {
  const { reset } = useQueryErrorResetBoundary();
  useEffect(() => reset, [reset]);
  return <Redirect to={redirectUrl} />;
};
