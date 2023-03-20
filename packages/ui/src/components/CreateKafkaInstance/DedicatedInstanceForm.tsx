import { Flex, FlexItem, Form } from "@patternfly/react-core";
import type { FormEvent, VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type { FieldInstanceNameProps, FieldSizeProps } from "./components";
import {
  FieldAZ,
  FieldInstanceName,
  FieldSize,
  FormAlerts,
  InstanceInfo,
  InstanceInfoSkeleton,
  ModalAlertsDedicatedPlan,
} from "./components";
import { FieldDedicatedCluster } from "./components/FieldDedicatedCluster";
import { useDedicatedPlanMachine } from "./machines";

export type DedicatedInstanceFormProps = {
  formId: string;
  onClickContactUs: () => void;
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
  onClickQuickStart: () => void;
  subscriptionOptionsHref: string;
};

export const DedicatedInstanceForm: VoidFunctionComponent<
  DedicatedInstanceFormProps
> = ({
  formId,
  onClickContactUs,
  onLearnHowToAddStreamingUnits,
  onLearnMoreAboutSizes,
  onClickQuickStart,
  subscriptionOptionsHref,
}) => {
  const { capabilities, selectedSize, error, onCreate } =
    useDedicatedPlanMachine();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onCreate();
    },
    [onCreate]
  );

  return (
    <>
      <ModalAlertsDedicatedPlan
        instanceAvailability={capabilities.instanceAvailability}
        onClickContactUs={onClickContactUs}
      />

      <Flex
        direction={{ default: "column", lg: "row" }}
        alignItems={{ lg: "alignItemsFlexStart" }}
      >
        <FlexItem flex={{ default: "flex_2" }}>
          <FormAlerts error={error} onClickContactUS={onClickContactUs} />
          <Form onSubmit={onSubmit} id={formId}>
            <ConnectedFieldInstanceName />
            <ConnectedFieldCluster />
            <ConnectedFieldAZ />
            <ConnectedFieldSize
              onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
              onLearnMoreAboutSizes={onLearnMoreAboutSizes}
            />
          </Form>
        </FlexItem>
        <FlexItem
          flex={{ default: "flex_1" }}
          className="mas--CreateKafkaInstance__sidebar"
        >
          {selectedSize === undefined ? (
            <InstanceInfoSkeleton
              isTrial={false}
              onClickQuickStart={onClickQuickStart}
            />
          ) : (
            <InstanceInfo
              isTrial={false}
              trialDurationInHours={undefined}
              ingress={selectedSize.ingress}
              egress={selectedSize.egress}
              storage={selectedSize.storage}
              maxPartitions={selectedSize.maxPartitions}
              connections={selectedSize.connections}
              connectionRate={selectedSize.connectionRate}
              messageSize={selectedSize.messageSize}
              onClickQuickStart={onClickQuickStart}
              streamingUnits={selectedSize.displayName}
              billing={{
                value: "dedicated",
                subscriptionOptionsHref,
                type: "rh-only",
              }}
            />
          )}
        </FlexItem>
      </Flex>
    </>
  );
};

export const ConnectedFieldInstanceName: VoidFunctionComponent = () => {
  const {
    form,
    isNameTaken,
    isNameInvalid,
    isNameEmpty,
    isNameError,
    isFormEnabled,
    setName,
  } = useDedicatedPlanMachine();

  const validity: FieldInstanceNameProps["validity"] = (() => {
    if (isNameTaken) {
      return "taken";
    } else if (isNameInvalid) {
      return "invalid";
    } else if (isNameEmpty && isNameError) {
      return "required";
    }
    return "valid";
  })();

  return (
    <FieldInstanceName
      value={form.name || ""}
      validity={validity}
      isDisabled={!isFormEnabled}
      onChange={setName}
    />
  );
};

export const ConnectedFieldCluster: VoidFunctionComponent = () => {
  const { form, capabilities, isClusterError, isFormEnabled, setCluster } =
    useDedicatedPlanMachine();

  const clusters = capabilities.availableClusters;

  return (
    <FieldDedicatedCluster
      isValid={!isClusterError}
      clusters={clusters}
      value={form.cluster}
      isDisabled={!isFormEnabled}
      onChange={setCluster}
    />
  );
};

export const ConnectedFieldAZ: VoidFunctionComponent = () => {
  const { isFormEnabled } = useDedicatedPlanMachine();

  return (
    <FieldAZ
      validity={"valid"}
      options={"multi"}
      value={"multi"}
      isDisabled={!isFormEnabled}
      onChange={() => false} // AZ is defined by the backend, we just visualize the value here
    />
  );
};

export const ConnectedFieldSize: VoidFunctionComponent<
  Pick<
    FieldSizeProps,
    "onLearnHowToAddStreamingUnits" | "onLearnMoreAboutSizes"
  >
> = ({ onLearnHowToAddStreamingUnits, onLearnMoreAboutSizes }) => {
  const {
    form,
    sizes,
    isSizeOverQuota,
    isSizeDisabled,
    isSizeError,
    isSizeLoadingError,
    isFormEnabled,
    isLoadingSizes,
    isLoading,
    setSize,
    remainingQuota,
  } = useDedicatedPlanMachine();

  return (
    <FieldSize
      value={form.size?.quota}
      sizes={sizes}
      remainingQuota={remainingQuota}
      isDisabled={!isFormEnabled || sizes === undefined}
      isLoading={isLoading || isLoadingSizes}
      isError={isSizeError}
      isLoadingError={isSizeLoadingError}
      validity={
        isSizeOverQuota ? "out-of-quota" : isSizeDisabled ? "required" : "valid"
      }
      onChange={setSize}
      onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
      onLearnMoreAboutSizes={onLearnMoreAboutSizes}
    />
  );
};
