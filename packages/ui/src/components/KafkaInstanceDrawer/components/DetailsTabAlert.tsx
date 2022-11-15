import { Alert } from "@patternfly/react-core";
import { differenceInHours } from "date-fns";
import type { FunctionComponent } from "react";
import { Trans } from "@rhoas/app-services-ui-components";
import { FormatDate } from "@rhoas/app-services-ui-components";

type DetailsTabAlertProps = {
  expiryDate: Date;
};

export const DetailsTabAlert: FunctionComponent<DetailsTabAlertProps> = ({
  expiryDate,
}) => {
  const hoursLeft = expiryDate ? differenceInHours(expiryDate, Date.now()) : 0;
  return (
    <Alert
      variant={
        hoursLeft > 24
          ? "info"
          : hoursLeft < 24 && hoursLeft > 5
          ? "warning"
          : "danger"
      }
      title={
        <Trans
          i18nKey="kafka:will_expire"
          components={{
            time: <FormatDate date={expiryDate} format="expiration" />,
          }}
        />
      }
      aria-live="polite"
      isInline
      className="pf-u-mb-lg"
    />
  );
};
