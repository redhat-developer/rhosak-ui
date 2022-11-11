import type { VoidFunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import type { DeleteModalProps } from "@rhoas/app-services-ui-components";
import { DeleteModal } from "@rhoas/app-services-ui-components";

export type DeleteKafkaTopicProps = {
  instanceName: string;
} & Omit<
  DeleteModalProps,
  "title" | "variant" | "confirmationValue" | "children"
>;

export const DeleteKafkaTopicActive: VoidFunctionComponent<
  DeleteKafkaTopicProps
> = ({ instanceName, ...props }) => {
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
      <Trans ns={"kafka"} i18nKey={"delete_topic_active_message"} />
    </DeleteModal>
  );
};
