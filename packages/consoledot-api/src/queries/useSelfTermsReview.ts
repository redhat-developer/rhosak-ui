import { useQuery } from "@tanstack/react-query";
import { fetchSelfTermsReview } from "../fetchers";
import { masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useSelfTermsReview(suspense = false) {
  const { account } = useApi();

  return useQuery({
    queryKey: masQueries.selfTermsReview(),
    queryFn: async () => {
      const api = account();

      return fetchSelfTermsReview((...args) =>
        api.apiAuthorizationsV1SelfTermsReviewPost(...args)
      );
    },
    suspense,
  });
}
