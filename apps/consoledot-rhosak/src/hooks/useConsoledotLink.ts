import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useCallback } from "react";

export function useConsoledotLink() {
  const { isBeta } = useChrome();
  const root = `${document.location.origin}${isBeta() ? "/beta" : ""}`;
  return useCallback(
    function consoledotLink(href: string) {
      if (!href.startsWith("/")) {
        throw new Error(
          "Invalid href provided to useConsoledotLink, href must start with '/'"
        );
      }
      if (!href.startsWith("/") || href.includes("..")) {
        throw new Error(
          "Invalid href provided to useConsoledotLink, href can't contain relative bits"
        );
      }
      return `${root}${href}`;
    },
    [root]
  );
}
