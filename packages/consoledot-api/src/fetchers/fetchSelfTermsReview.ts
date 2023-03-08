import type { AppServicesApi } from "@rhoas/account-management-sdk";

export async function fetchSelfTermsReview(
  api: AppServicesApi["apiAuthorizationsV1SelfTermsReviewPost"]
) {
  const response = await api({
    event_code: "register",
    site_code: "ocm",
  });
  const { terms_required, terms_available, redirect_url } = response.data;
  const areTermsAccepted =
    terms_required === false && terms_available === false;
  if (areTermsAccepted === false && redirect_url === undefined) {
    throw new Error("Invalid Terms and Conditions ");
  }
  return {
    areTermsAccepted,
    termsUrl: (createHref: string, cancelHref: string) => {
      if (redirect_url === undefined) {
        throw new Error("Invalid Terms and Conditions ");
      }
      const url = new URL(redirect_url);
      url.searchParams.set("redirect", createHref);
      url.searchParams.set("cancelRedirect", cancelHref);
      return url.href;
    },
  };
}
