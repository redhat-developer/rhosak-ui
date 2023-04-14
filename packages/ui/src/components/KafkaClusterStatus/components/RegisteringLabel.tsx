import {
  Split,
  SplitItem,
  Spinner,
  Button,
  Popover,
  Flex,
  FlexItem,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useRef } from "react";
import type { PopoverStatus } from "../types";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { ClusterRegisteringStateProgressStepper } from "./ClusterRegisteringStateProgressStepper";

export type RegisteringLabelProps = {
  registeringStep: PopoverStatus;
};

export const RegisteringLabel: VoidFunctionComponent<RegisteringLabelProps> = ({
  registeringStep,
}) => {
  const { t } = useTranslation("kafka");
  const labelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Split hasGutter className="mas-c-cluster-status">
        <SplitItem>
          <Spinner size="md" />
        </SplitItem>
        <SplitItem>
          <Button variant={"link"} isInline ref={labelRef}>
            {t("registering")}
          </Button>
          <Flex>
            <FlexItem>
              <HelperText>
                <HelperTextItem variant="indeterminate">
                  {t("status_created_shortly_help")}
                </HelperTextItem>
              </HelperText>
            </FlexItem>
          </Flex>
        </SplitItem>
      </Split>
      <Popover
        position={"right"}
        enableFlip={true}
        headerContent={t("cluster_status_popover_title")}
        bodyContent={
          <ClusterRegisteringStateProgressStepper
            registeringStep={registeringStep}
          />
        }
        reference={labelRef}
      />
    </>
  );
};
