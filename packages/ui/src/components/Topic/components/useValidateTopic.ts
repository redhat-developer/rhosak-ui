import { useTranslation } from "@rhoas/app-services-ui-components";
import { useCallback } from "react";

export const useValidateTopic = (): {
  validateName: (name: string) => string | undefined;
} => {
  const { t } = useTranslation(["create-topic"]);

  return {
    validateName: useCallback(
      (name) => {
        const legalNameChars = new RegExp("^[a-zA-Z0-9._-]+$");
        if (name.length && !legalNameChars.test(name)) {
          return t("topic_name_helper_text");
        } else if (name.length > 249) {
          return t("cannot_exceed_characters");
        } else if (name === "." || name === "..") {
          return t("invalid_name_with_dot");
        }
        return undefined;
      },
      [t]
    ),
  };
};
