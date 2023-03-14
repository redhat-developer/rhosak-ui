import type { WizardStep } from "@patternfly/react-core";
import {
  Divider,
  PageSection,
  PageSectionTypes,
  PageSectionVariants,
  ValidatedOptions,
  Wizard,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type React from "react";
import { useState } from "react";
import type { Topic } from "ui-models/src/models/topic";
import type { IWizardFooter } from "./index";
import {
  StepMessageRetention,
  StepPartitions,
  StepReplicas,
  StepTopicName,
  WizardCustomFooter,
} from "./index";
import { PartitionLimitWarning } from "./PartitionLimitWarning";
import { TopicAdvancePage } from "./TopicAdvancePage";
import type {
  CustomRetentionSizeSelect,
  CustomSelect,
  RadioSelectType,
  RetentionSizeRadioSelect,
  TopicForm,
} from "./types";
import type { AZ } from "ui-models/src/models/kafka";
import type { CleanupPolicy } from "ui-models/src/types";

export type CreateTopicWizardProps = {
  isSwitchChecked: boolean;
  setIsCreateTopic?: (value: boolean) => void;
  onCloseCreateTopic: () => void;
  onSave: (topicData: TopicForm) => void;
  topicData: Topic;
  checkTopicName: (value: string) => boolean;
  availablePartitionLimit: number;
  availabilityZone: AZ;
};

export const CreateTopicWizard: React.FC<CreateTopicWizardProps> = ({
  isSwitchChecked,
  onCloseCreateTopic,
  onSave,
  topicData,
  checkTopicName,
  availablePartitionLimit,
  availabilityZone,
}) => {
  const { t } = useTranslation(["create-topic", "common"]);

  const [customTimeValue, setCustomTimeValue] = useState<CustomSelect>({
    unit: "days",
    value: 7,
  });

  const [customRetentionSizeValue, setCustomRetentionSizeValue] =
    useState<CustomRetentionSizeSelect>({ unit: "bytes", value: 1 });

  const [topicName, setTopicName] = useState<string>(topicData.name);
  const [cleanupPolicy, setCleanupPolicy] = useState<CleanupPolicy>(
    topicData["cleanup.policy"]
  );
  const [partitions, setPartitions] = useState<number>(
    topicData.partitions.length
  );
  const [topicNameValidated, setTopicNameValidated] =
    useState<ValidatedOptions>(ValidatedOptions.default);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidText, setInvalidText] = useState<string>("");
  //const [topicData] = useState<Topic>(initialFieldsValue);
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);
  const [radioTimeSelectValue, setRadioTimeSelectValue] =
    useState<RadioSelectType>("week");

  const [radioSizeSelectValue, setRadioSizeSelectValue] =
    useState<RetentionSizeRadioSelect>("unlimited");

  const closeWizard = () => {
    onCloseCreateTopic && onCloseCreateTopic();
  };

  const steps: WizardStep[] = [
    {
      name: t("topic_name"),
      enableNext:
        topicData?.name.trim() !== "" &&
        topicNameValidated === ValidatedOptions.default,
      component: (
        <StepTopicName
          topicName={topicName}
          onTopicNameChange={setTopicName}
          topicNameValidated={topicNameValidated}
          onValidationCheck={setTopicNameValidated}
          invalidText={invalidText}
          setInvalidText={setInvalidText}
        />
      ),
    },
    {
      name: t("partitions"),
      canJumpTo: topicData?.name.trim() !== "",
      component: (
        <StepPartitions
          partitions={partitions}
          onPartitionsChange={setPartitions}
          availablePartitionLimit={availablePartitionLimit}
        />
      ),
    },
    {
      name: t("message_retention"),
      canJumpTo: topicData?.name.trim() !== "",
      component: (
        <StepMessageRetention
          customRetentionSizeValue={customRetentionSizeValue}
          setCustomRetentionSizeValue={setCustomRetentionSizeValue}
          customTimeValue={customTimeValue}
          setCustomTimeValue={setCustomTimeValue}
          radioTimeSelectValue={radioTimeSelectValue}
          setRadioTimeSelectValue={setRadioTimeSelectValue}
          radioSizeSelectValue={radioSizeSelectValue}
          setRadioSizeSelectValue={setRadioSizeSelectValue}
        />
      ),
    },
    {
      name: t("replicas"),
      canJumpTo: topicData?.name.trim() !== "",
      component: (
        <StepReplicas
          minInSyncReplica={topicData["min.insync.replicas"]}
          availabilityZone={availabilityZone}
        />
      ),
      nextButtonText: t("finish"),
    },
  ];

  const title = t("wizard_title");

  const onTransform = () => {
    const topicValues: TopicForm = {
      name: topicName,
      partitions: partitions,
      retentionTime:
        radioTimeSelectValue == "unlimited"
          ? { value: -1, unit: "unlimited" }
          : customTimeValue,
      retentionSize:
        radioSizeSelectValue == "unlimited"
          ? { value: -1, unit: "unlimited" }
          : customRetentionSizeValue,
      cleanupPolicy: cleanupPolicy,
    };

    onSave(topicValues);
  };

  const onConfirmSave = () => {
    if (partitions >= availablePartitionLimit) setWarningModalOpen(true);
    else onTransform();
  };

  const onValidate: IWizardFooter["onValidate"] = (onNext) => {
    if (topicName.length < 1) {
      setInvalidText(t("common:required"));
      setTopicNameValidated(ValidatedOptions.error);
    } else {
      setIsLoading(true);

      const isTopicNameValid = checkTopicName(topicName);
      if (!isTopicNameValid) {
        setIsLoading(false);
        setInvalidText(t("already_exists", { name: topicData?.name })),
          setTopicNameValidated(ValidatedOptions.error);
      } else onNext();
    }
  };

  return (
    <>
      {isSwitchChecked ? (
        <>
          <Divider className="kafka-ui--divider--FlexShrink" />
          <PageSection
            variant={PageSectionVariants.light}
            hasOverflowScroll={true}
            aria-label={"TODO"}
          >
            {
              <TopicAdvancePage
                isCreate={true}
                onConfirm={onConfirmSave}
                handleCancel={onCloseCreateTopic}
                topicName={topicName}
                onTopicNameChange={setTopicName}
                partitions={partitions}
                onPartitionsChange={setPartitions}
                onCleanupPolicyChange={setCleanupPolicy}
                cleanupPolicy={cleanupPolicy}
                checkTopicName={checkTopicName}
                availablePartitionLimit={availablePartitionLimit}
                customRetentionSizeValue={customRetentionSizeValue}
                setCustomRetentionSizeValue={setCustomRetentionSizeValue}
                customTimeValue={customTimeValue}
                setCustomTimeValue={setCustomTimeValue}
                radioTimeSelectValue={radioTimeSelectValue}
                setRadioTimeSelectValue={setRadioTimeSelectValue}
                radioSizeSelectValue={radioSizeSelectValue}
                setRadioSizeSelectValue={setRadioSizeSelectValue}
                topicData={topicData}
              />
            }
            {warningModalOpen && (
              <PartitionLimitWarning
                topicData={topicData}
                onSave={onTransform}
                isModalOpen={warningModalOpen}
                setIsModalOpen={setWarningModalOpen}
              />
            )}
          </PageSection>
        </>
      ) : (
        <PageSection
          variant={PageSectionVariants.light}
          type={PageSectionTypes.wizard}
          hasOverflowScroll={true}
          aria-label={"TODO"}
        >
          <Wizard
            navAriaLabel={`${title} steps`}
            mainAriaLabel={`${title} content`}
            steps={steps}
            onClose={closeWizard}
            onSave={onConfirmSave}
            data-testid="topicBasicCreate-Wizard"
            footer={
              <WizardCustomFooter
                isLoading={isLoading}
                onValidate={onValidate}
                topicNameValidated={topicNameValidated}
                closeWizard={closeWizard}
              />
            }
          />
          {warningModalOpen && (
            <PartitionLimitWarning
              topicData={topicData}
              onSave={onTransform}
              isModalOpen={warningModalOpen}
              setIsModalOpen={setWarningModalOpen}
            />
          )}
        </PageSection>
      )}
    </>
  );
};
