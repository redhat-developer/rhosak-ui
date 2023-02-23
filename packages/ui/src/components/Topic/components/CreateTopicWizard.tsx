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
import { retentionTimeTransformer } from "./retentionTimeTransformer";
import { TopicAdvancePage } from "./TopicAdvancePage";
import type { CustomSelect, RadioSelectType } from "./types";

export type CreateTopicWizardProps = {
  isSwitchChecked: boolean;
  setIsCreateTopic?: (value: boolean) => void;
  onCloseCreateTopic: () => void;
  onSave: (topicData: Topic) => void;
  initialFieldsValue: Topic;
  checkTopicName: (value: string) => Promise<boolean>;
  availablePartitionLimit: number;
};

export const CreateTopicWizard: React.FC<CreateTopicWizardProps> = ({
  isSwitchChecked,
  onCloseCreateTopic,
  onSave,
  initialFieldsValue,
  checkTopicName,
  availablePartitionLimit,
}) => {
  const { t } = useTranslation(["create-topic", "common"]);

  const [customValue, setCustomValue] = useState<CustomSelect>({
    unit: "days",
    value: 7,
  });

  const [topicNameValidated, setTopicNameValidated] =
    useState<ValidatedOptions>(ValidatedOptions.default);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidText, setInvalidText] = useState<string>("");
  const [topicData, setTopicData] = useState<Topic>(initialFieldsValue);
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);
  const [radioSelectValue, setRadioSelectValue] =
    useState<RadioSelectType>("week");

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
          newTopicData={topicData}
          onTopicNameChange={setTopicData}
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
          newTopicData={topicData}
          onPartitionsChange={setTopicData}
          availablePartitionLimit={availablePartitionLimit}
        />
      ),
    },
    {
      name: t("message_retention"),
      canJumpTo: topicData?.name.trim() !== "",
      component: (
        <StepMessageRetention
          customValue={customValue}
          setCustomValue={setCustomValue}
          newTopicData={topicData}
          onChangeMessageRetention={setTopicData}
          radioSelectValue={radioSelectValue}
          setRadioSelectValue={setRadioSelectValue}
        />
      ),
    },
    {
      name: t("replicas"),
      canJumpTo: topicData?.name.trim() !== "",
      component: (
        <StepReplicas
          replicationFactor={3 /* TODO */}
          minInSyncReplica={topicData["min.insync.replicas"]}
          isMultiAZ={false /* TODO */}
        />
      ),
      nextButtonText: t("finish"),
    },
  ];

  const title = t("wizard_title");

  const onTransform = () => {
    const tranformedValueInMilliseconds = retentionTimeTransformer(customValue);
    const transformedTopic: Topic = {
      ...topicData,
      "retention.ms": { type: "ms", value: tranformedValueInMilliseconds },
    };
    onSaveTopic(transformedTopic);
  };
  const onValidate: IWizardFooter["onValidate"] = (onNext) => {
    if (topicData?.name.length < 1) {
      setInvalidText(t("common:required"));
      setTopicNameValidated(ValidatedOptions.error);
    } else {
      setIsLoading(true);

      checkTopicName(topicData?.name)
        .then((value) =>
          value == false
            ? (setInvalidText(t("already_exists", { name: topicData?.name })),
              setTopicNameValidated(ValidatedOptions.error))
            : onNext()
        )
        .finally(() => setIsLoading(false));
    }
  };
  const onSaveTopic = (transformedTopic: Topic) => {
    if (topicData.partitions.length >= availablePartitionLimit)
      setWarningModalOpen(true);
    else onSave(transformedTopic);
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
                onConfirm={onTransform}
                handleCancel={onCloseCreateTopic}
                topicData={topicData}
                setTopicData={setTopicData}
                checkTopicName={checkTopicName}
                availablePartitionLimit={availablePartitionLimit}
              />
            }
            {warningModalOpen && (
              <PartitionLimitWarning
                topicData={topicData}
                onSave={onSaveTopic}
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
            onSave={onTransform}
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
              onSave={onSave}
              isModalOpen={warningModalOpen}
              setIsModalOpen={setWarningModalOpen}
            />
          )}
        </PageSection>
      )}
    </>
  );
};
