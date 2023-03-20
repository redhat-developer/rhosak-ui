import type { VoidFunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { DisabledCreateKafkaInstanceDialog } from "ui";

export const DisabledCreateKafkaInstanceRoute: VoidFunctionComponent = () => {
  const history = useHistory();
  const onConfirm = () => {
    history.push("../");
  };
  return (
    <DisabledCreateKafkaInstanceDialog
      onConfirm={onConfirm}
      isModalOpen={true}
    />
  );
};
