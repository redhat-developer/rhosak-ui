import { useSelfTermsReview } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TermsAndConditionsDialog } from "ui";

export const TermsAndConditionsRoute: FunctionComponent<{
  createHref: string;
  cancelHref: string;
}> = ({ createHref, cancelHref }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const { data: selfTermsReview } = useSelfTermsReview();
  const baselinedCreateHref =
    window.location.origin +
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    (history.createHref({
      pathname: createHref,
    }) as string);
  const baselinedCancelHref =
    window.location.origin +
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    (history.createHref({
      pathname: cancelHref,
    }) as string);
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(cancelHref);
  }, [history, cancelHref]);

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
