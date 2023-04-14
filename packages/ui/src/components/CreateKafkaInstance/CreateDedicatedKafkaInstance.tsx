import {
  Alert,
  Button,
  Modal,
  ModalVariant,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { OutlinedClockIcon } from "@patternfly/react-icons";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { FunctionComponent, VoidFunctionComponent } from "react";
import { ModalAlertsLoading, ModalAlertsSystemUnavailable } from "./components";

import "./CreateKafkaInstance.css";
import { DedicatedInstanceForm } from "./DedicatedInstanceForm";
import { DedicatedTrialInstanceForm } from "./DedicatedTrialInstanceForm";
import { LoadingForm } from "./LoadingForm";
import type { CreateDedicatedKafkaInstanceServices } from "./machines";
import {
  CreateDedicatedKafkaInstanceProvider,
  useCreateDedicatedKafkaInstance,
} from "./machines";

export type CreateDedicatedKafkaInstanceProps =
  ConnectedCreateDedicatedKafkaInstanceProps &
    CreateDedicatedKafkaInstanceServices;
export const CreateDedicatedKafkaInstance: FunctionComponent<
  CreateDedicatedKafkaInstanceProps
> = ({
  checkDedicatedQuota,
  checkDeveloperAvailability,
  getDedicatedSizes,
  getTrialSizes,
  fetchClusters,
  onCreate,
  ...props
}) =>
  props.isModalOpen ? (
    <CreateDedicatedKafkaInstanceProvider
      checkDedicatedQuota={checkDedicatedQuota}
      checkDeveloperAvailability={checkDeveloperAvailability}
      getDedicatedSizes={getDedicatedSizes}
      getTrialSizes={getTrialSizes}
      fetchClusters={fetchClusters}
      onCreate={onCreate}
    >
      <ConnectedCreateDedicatedKafkaInstance {...props} />
    </CreateDedicatedKafkaInstanceProvider>
  ) : null;

export type ConnectedCreateDedicatedKafkaInstanceProps = {
  /**
   *
   * Flag to show the modal
   */
  isModalOpen: boolean;

  /**
   * Set this to `true` on Storybook when there are multiple modals open at a time.
   */
  disableFocusTrap?: boolean;
  /**
   * The parent container to append the modal to. Defaults to document.body
   */
  appendTo?: () => HTMLElement;

  /**
   * A callback for when the cancel or close button are clicked.
   */
  onCancel: () => void;
  onClickQuickStart: () => void;
  onClickContactUs: () => void;
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
  onClickKafkaOverview: () => void;
  subscriptionOptionsHref: string;
};
export const ConnectedCreateDedicatedKafkaInstance: VoidFunctionComponent<
  ConnectedCreateDedicatedKafkaInstanceProps
> = ({
  isModalOpen,
  appendTo,
  onClickQuickStart,
  onCancel,
  disableFocusTrap,
  onClickContactUs,
  onLearnHowToAddStreamingUnits,
  onLearnMoreAboutSizes,
  onClickKafkaOverview,
  subscriptionOptionsHref,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  const { isLoading, isDedicated, isDeveloper, isSaving } =
    useCreateDedicatedKafkaInstance();

  const FORM_ID = "create_kafka_instance_form";

  return (
    <Modal
      id="modalCreateKafka"
      variant={ModalVariant.large}
      title={t("create_instance_title")}
      disableFocusTrap={disableFocusTrap}
      isOpen={isModalOpen}
      ouiaId="modal-create-kafka"
      onClose={onCancel}
      appendTo={appendTo}
      position="top"
      footer={
        <Stack hasGutter={true}>
          <StackItem>
            <Alert
              className="mas--CreateDedicatedKafkaInstance__creationTimeAlert"
              customIcon={<OutlinedClockIcon />}
              variant="info"
              isInline
              isPlain
              title={t("instance_creation_time_alert")}
            />
          </StackItem>
          <StackItem>
            <Button
              key="submit"
              variant="primary"
              type="submit"
              form={FORM_ID}
              spinnerAriaValueText={t("common:submitting_request")}
              isDisabled={isLoading || isSaving}
              isLoading={isSaving}
              data-testid="modalCreateKafka-buttonSubmit"
              ouiaId="button-create"
            >
              {t("create_instance")}
            </Button>
            <Button
              key="cancel"
              variant="link"
              onClick={onCancel}
              data-testid="modalCreateKafka-buttonCancel"
            >
              {t("common:cancel")}
            </Button>
          </StackItem>
        </Stack>
      }
    >
      {(() => {
        switch (true) {
          case isLoading:
            return (
              <>
                <ModalAlertsLoading />
                <LoadingForm
                  onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
                  onLearnMoreAboutSizes={onLearnMoreAboutSizes}
                  onClickQuickStart={onClickQuickStart}
                />
              </>
            );
          case isDedicated:
            return (
              <DedicatedInstanceForm
                formId={FORM_ID}
                onClickContactUs={onClickContactUs}
                onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
                onLearnMoreAboutSizes={onLearnMoreAboutSizes}
                onClickQuickStart={onClickQuickStart}
                subscriptionOptionsHref={subscriptionOptionsHref}
              />
            );
          case isDeveloper:
            return (
              <DedicatedTrialInstanceForm
                formId={FORM_ID}
                onClickContactUs={onClickContactUs}
                onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
                onLearnMoreAboutSizes={onLearnMoreAboutSizes}
                onClickQuickStart={onClickQuickStart}
                onClickKafkaOverview={onClickKafkaOverview}
              />
            );
          default:
            return (
              <>
                <ModalAlertsSystemUnavailable />
                <LoadingForm
                  onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
                  onLearnMoreAboutSizes={onLearnMoreAboutSizes}
                  onClickQuickStart={onClickQuickStart}
                />
              </>
            );
        }
      })()}
    </Modal>
  );
};
