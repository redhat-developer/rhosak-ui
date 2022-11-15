import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "@rhoas/app-services-ui-components";
import type { DeleteModalProps } from "@rhoas/app-services-ui-components";
import { DeleteModal } from "@rhoas/app-services-ui-components";

export type DeleteKafkaTopicProps = {
  instanceName: string;
} & Omit<
  DeleteModalProps,
  "title" | "variant" | "confirmationValue" | "children"
>;

export const DeleteKafkaTopic: VoidFunctionComponent<DeleteKafkaTopicProps> = ({
  instanceName,
  ...props
}) => {
  const { t } = useTranslation("kafka");

  return (
    <DeleteModal
      {...props}
      variant={"destructive"}
      title={t("delete_topic_title")}
      confirmationValue={instanceName}
    >
      <Trans
        ns={"kafka"}
        i18nKey={"delete_topic_message"}
        components={[<strong />]}
        values={{
          instanceName,
        }}
      />
    </DeleteModal>
  );
};
