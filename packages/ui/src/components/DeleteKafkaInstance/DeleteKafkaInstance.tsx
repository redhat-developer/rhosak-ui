import type { DeleteModalProps } from "@rhoas/app-services-ui-components";
import {
  DeleteModal,
  Trans,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export type DeleteKafkaInstanceProps = {
  instanceName: string | undefined;
} & Omit<
  DeleteModalProps,
  "title" | "variant" | "confirmationValue" | "children"
>;

export const DeleteKafkaInstance: VoidFunctionComponent<
  DeleteKafkaInstanceProps
> = ({ instanceName, ...props }) => {
  const { t } = useTranslation("kafka");

  return (
    <DeleteModal
      {...props}
      variant={"destructive"}
      title={t("delete_instance_title")}
      confirmationValue={instanceName}
    >
      <Trans
        ns={"kafka"}
        i18nKey={"delete_instance_message"}
        components={[<strong />]}
        values={{
          instanceName,
        }}
      />
    </DeleteModal>
  );
};
