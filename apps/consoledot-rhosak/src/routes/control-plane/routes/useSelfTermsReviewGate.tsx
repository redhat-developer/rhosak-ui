import { useSelfTermsReview } from "consoledot-api";

export function useSelfTermsReviewGate() {
  const { data } = useSelfTermsReview(true);
  const selfTermsReview = data as NonNullable<typeof data>;
  if (selfTermsReview.areTermsAccepted === false) {
    throw new Error("Terms and Conditions not accepted");
  }
  return {
    selfTermsReview,
  };
}
