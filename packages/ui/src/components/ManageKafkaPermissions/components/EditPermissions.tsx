import {
  Button,
  ExpandableSection,
  Form,
  FormGroup,
  Modal,
  TextContent,
  TextVariants,
  Text,
  Badge,
  Alert,
  Popover,
} from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AssignPermissions } from "./AssignPermissions";
import { PreCancelModal } from "./PreCancelModal";
import { ViewAccountDetails } from "./ViewAccountDetails";
import type { AddAclType } from "../types";
import type { AclBinding } from "@rhoas/kafka-instance-sdk";
import type { Permissions } from "ui";
import {
  createEmptyConsumeTopicAcl,
  createEmptyManageAccessAcl,
  createEmptyManualAcl,
  createEmptyProduceTopicAcl,
} from "../types";
import { transformPermissions } from "../utils";

export type AclType = {
  groups: Permissions[];
  count: number;
};

export type EditPermissionsProps = {
  onCancel: () => void;
  kafkaName: string;
  onSave: (
    acls: AclBinding[] | undefined,
    deletedAcls: AclBinding[] | undefined
  ) => void;
  acls: AclBinding[];
  topicsList: string[];
  consumerGroupsList: string[];
  id?: string;
  selectedAccount: string | undefined;
};

export const EditPermissions: React.FC<EditPermissionsProps> = ({
  onCancel,
  kafkaName,
  acls,
  onSave,
  topicsList,
  consumerGroupsList,
  selectedAccount,
  id,
}) => {
  const { t } = useTranslation([
    "manage-kafka-permissions",
    "create-kafka-instance",
  ]);

  const escapeClosesModal = useRef<boolean>(true);
  const [
    isExpandedExistingPermissionSection,
    setIsExpandedExistingPermissionSection,
  ] = useState<boolean>(false);
  const [isAclDeleted, setIsAclDeleted] = useState<boolean>(false);
  const [
    isExpandedAssignPermissionsSection,
    setIsExpandedAssignPermissionsSection,
  ] = useState<boolean>(true);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [canSave, setCanSave] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isOpenPreCancelModal, setIsOpenPreCancelModal] =
    useState<boolean>(false);
  const [existingAcls, setExistingAcls] = useState<AclBinding[]>(acls);
  const [newAcls, setNewAcls] = useState<AddAclType[]>();
  const [deletedAcls, setDeletedAcls] = useState<AclBinding[] | undefined>(
    undefined
  );

  const checkValidation = useCallback(() => {
    if (newAcls) {
      const isRowInvalid = newAcls?.map((value) =>
        value.type == "manual" &&
        value.resourceType == "kafka-instance" &&
        value.resourceOperation != undefined
          ? false
          : Object.values(value).includes(undefined)
      );
      isRowInvalid.includes(true) ? setCanSave(false) : setCanSave(true);
      if (canSave == true && isNameValid) return true;
      else return false;
    }
    if (deletedAcls && deletedAcls.length > 0) {
      setCanSave(true);
      return true;
    } else return false;
  }, [canSave, deletedAcls, isNameValid, newAcls]);

  useEffect(() => {
    checkValidation();
  }, [checkValidation, newAcls]);

  useEffect(() => {
    //Fetch the latest table for exiting acls, only when no row is scheduled for deletion
    if (deletedAcls == undefined) setExistingAcls(acls);
  }, [acls, deletedAcls]);

  const onEscapePress = () => {
    if (escapeClosesModal.current) {
      onCancel();
    }
  };
  const topicFilter = (filter: string) => {
    if (filter == "" || filter == undefined) return topicsList;
    else return topicsList.filter((v) => v.includes(filter));
  };

  const consumerGroupsFilter = (filter: string) => {
    if (filter == "" || filter == undefined) return consumerGroupsList;
    else return consumerGroupsList.filter((v) => v.includes(filter));
  };

  const aclsToSave: AclBinding[] = [];

  const onClickSubmit = () => {
    if (
      (newAcls && newAcls.length > 0) ||
      (deletedAcls && deletedAcls.length > 0)
    ) {
      setSubmitted(true);
      const isAclValid = checkValidation();
      transformPermissions(aclsToSave, newAcls, selectedAccount);
      isAclValid && onSave(aclsToSave, deletedAcls);
    }
  };

  const onAddManualPermissions = () => {
    setSubmitted(false);
    setNewAcls((prevState) =>
      prevState
        ? [...prevState, createEmptyManualAcl()]
        : [createEmptyManualAcl()]
    );
  };
  const onAddProduceTopicShortcut = () => {
    setSubmitted(false);
    setNewAcls((prevState) =>
      prevState
        ? [...prevState, createEmptyProduceTopicAcl()]
        : [createEmptyProduceTopicAcl()]
    );
  };
  const onConsumeTopicShortcut = () => {
    setSubmitted(false);
    setNewAcls((prevState) =>
      prevState
        ? [...prevState, createEmptyConsumeTopicAcl()]
        : [createEmptyConsumeTopicAcl()]
    );
  };
  const onManageAccessShortcut = () => {
    setSubmitted(false);
    setNewAcls((prevState) =>
      prevState
        ? [...prevState, createEmptyManageAccessAcl(kafkaName)]
        : [createEmptyManageAccessAcl(kafkaName)]
    );
  };

  const onDeleteNewAcl = (row: number) => {
    setNewAcls(
      (prevState) => prevState && prevState.filter((_, index) => index !== row)
    );
  };

  const onChangeExpandedExistingPermissionsSection = (value: boolean) => {
    setIsExpandedExistingPermissionSection(value);
  };
  const onChangeExpandedAssignPermissionsSection = (value: boolean) => {
    setIsExpandedAssignPermissionsSection(value);
  };

  const isDisabled =
    (submitted && !canSave) ||
    ((newAcls == undefined || newAcls.length < 1) && !isAclDeleted) ||
    !isNameValid
      ? true
      : false;
  const onClose = () => {
    !isDisabled || (newAcls && newAcls?.length > 0)
      ? setIsOpenPreCancelModal(true)
      : onCancel();
  };

  const closePreCancelModal = () => {
    setIsOpenPreCancelModal(false);
    onCancel();
  };

  const resumeEditingPermissions = () => {
    setIsOpenPreCancelModal(false);
  };

  const updateExistingAcls = (row: number) => {
    setExistingAcls((existingAcls || []).filter((_, index) => index != row));
  };

  const onRemoveAcls = (row: number) => {
    setDeletedAcls((prevState) =>
      existingAcls && prevState != undefined
        ? [...prevState, existingAcls[row]]
        : existingAcls && [existingAcls[row]]
    );
    setIsAclDeleted(true);
    updateExistingAcls(row);
  };
  return (
    <Modal
      id="manage-permissions-modal"
      variant={"large"}
      isOpen={true}
      aria-label={t("dialog_aria_label")}
      position="top"
      title={t("dialog_title")}
      showClose={true}
      aria-describedby="modal-message"
      onClose={onClose}
      onEscapePress={onEscapePress}
      appendTo={() =>
        id ? document.getElementById(id) || document.body : document.body
      }
      actions={[
        <Button
          key={1}
          variant="primary"
          isDisabled={isDisabled}
          onClick={onClickSubmit}
          aria-label={t("step_2_submit_button")}
        >
          {t("step_2_submit_button")}
        </Button>,
        <Button
          onClick={onClose}
          key={2}
          variant="secondary"
          aria-label={t("common:cancel")}
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <PreCancelModal
        isOpen={isOpenPreCancelModal}
        closeModal={closePreCancelModal}
        resumeEditing={resumeEditingPermissions}
      />
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup
          fieldId="kafka-instance-name"
          label={t("kafka_instance")}
          id="modal-message"
        >
          {kafkaName}
        </FormGroup>

        <FormGroup
          fieldId="account-name"
          label={t("account_id_title")}
          labelIcon={
            <Popover bodyContent={t("account_id_help")}>
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="pf-c-form__group-label-help"
                aria-label={t("account_help")}
              >
                <HelpIcon noVerticalAlign />
              </button>
            </Popover>
          }
        >
          {
            //The value received will have a prefix 'User:'.Remove the prefix when displaying value
            selectedAccount === "All accounts"
              ? t("all_accounts_title")
              : selectedAccount?.split(":")[1]
          }
        </FormGroup>
        {(!canSave || !isNameValid) && submitted && (
          <Alert
            isInline
            title={t("create-kafka-instance:form_errors.form_invalid")}
            variant={"danger"}
          />
        )}
        <ExpandableSection
          isIndented={true}
          isExpanded={isExpandedExistingPermissionSection}
          onToggle={onChangeExpandedExistingPermissionsSection}
          toggleContent={
            <div>
              <span>{t("review_existing_title")}</span>{" "}
              <Badge isRead={existingAcls.length == 0 ? true : false}>
                {existingAcls.length}
              </Badge>
            </div>
          }
        >
          <ViewAccountDetails
            accountId={selectedAccount}
            existingAcls={existingAcls}
            onRemoveAcl={onRemoveAcls}
          />
        </ExpandableSection>
        <FormGroup>
          <ExpandableSection
            toggleText={t("assign_permissions_title")}
            isIndented={true}
            isExpanded={isExpandedAssignPermissionsSection}
            onToggle={onChangeExpandedAssignPermissionsSection}
          >
            <FormGroup>
              <TextContent>
                <Text component={TextVariants.small}>
                  {selectedAccount === "All accounts"
                    ? t("assign_permissions_all_description")
                    : t("assign_permissions_description", {
                        value: selectedAccount?.split(":")[1],
                      })}
                </Text>
                {newAcls && newAcls?.length > 0 && (
                  <Text component={TextVariants.small}>
                    {t("all_fields_required")}
                  </Text>
                )}
              </TextContent>
            </FormGroup>
            <AssignPermissions
              setIsNameValid={setIsNameValid}
              submitted={submitted}
              onAddManualPermissions={onAddManualPermissions}
              onAddProduceTopicShortcut={onAddProduceTopicShortcut}
              onConsumeTopicShortcut={onConsumeTopicShortcut}
              onManageAccessShortcut={onManageAccessShortcut}
              onDelete={onDeleteNewAcl}
              topicNameOptions={topicFilter}
              consumerGroupNameOptions={consumerGroupsFilter}
              addedAcls={newAcls}
              kafkaName={kafkaName}
              setAddedAcls={setNewAcls}
            />
          </ExpandableSection>
        </FormGroup>
      </Form>
    </Modal>
  );
};
