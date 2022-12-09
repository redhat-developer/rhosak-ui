import type { PopoverProps } from "@patternfly/react-core";
import { Popover, TextContent } from "@patternfly/react-core";
import { ExclamationTriangleIcon } from "@patternfly/react-icons";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { RefObject, VoidFunctionComponent } from "react";

export type SuspendedPopoverProps = {
  children?: PopoverProps["children"];
  reference?: RefObject<HTMLButtonElement>;
};

export const SuspendedPopover: VoidFunctionComponent<SuspendedPopoverProps> = ({
  children,
  reference,
}) => {
  const { t } = useTranslation("kafka");
  return (
    <Popover
      alertSeverityVariant={"warning"}
      headerIcon={<ExclamationTriangleIcon />}
      headerContent={t("suspend_popover_title")}
      bodyContent={
        <TextContent>
          <p>{t("suspend_popover_body_1")}</p>
        </TextContent>
      }
      position={"right"}
      reference={reference}
    >
      {children}
    </Popover>
  );
};
