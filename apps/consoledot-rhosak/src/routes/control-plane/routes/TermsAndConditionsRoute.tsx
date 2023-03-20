import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useSelfTermsReview } from "consoledot-api/src";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TermsAndConditionsDialog } from "ui";

export const TermsAndConditionsRoute: FunctionComponent<{
  createHref: string;
  cancelHref: string;
}> = ({ createHref, cancelHref }) => {
  const { analytics } = useChrome();
  const history = useHistory();
  const { data: selfTermsReview } = useSelfTermsReview();
  const baselinedCreateHref =
    window.location.origin +
    history.createHref({
      pathname: createHref,
    });
  const baselinedCancelHref =
    window.location.origin +
    history.createHref({
      pathname: cancelHref,
    });
  const termsUrl = selfTermsReview?.termsUrl(
    baselinedCreateHref,
    baselinedCancelHref
  );
  const onViewTerms = useCallback(
    function () {
      if (termsUrl !== undefined) {
        window.location.href = termsUrl;
      }
    },
    [termsUrl]
  );

  const onCancel = useCallback(() => {
    void analytics.track("RHOSAK Create Instance", {
      status: "failure-tos-refused",
    });
    history.push(cancelHref);
  }, [analytics, history, cancelHref]);

  return (
    <TermsAndConditionsDialog
      isOpen={true}
      onViewTerms={onViewTerms}
      onCancel={onCancel}
      appendTo={() =>
        (document.getElementById("chrome-app-render-root") as HTMLElement) ||
        document.body
      }
    />
  );
};
