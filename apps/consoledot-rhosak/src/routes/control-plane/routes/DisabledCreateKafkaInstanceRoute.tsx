import type { VoidFunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { DisabledCreateKafkaInstanceDialog } from "ui";

export const DisabledCreateKafkaInstanceRoute: VoidFunctionComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const onConfirm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push("../");
  };
  return (
    <DisabledCreateKafkaInstanceDialog
      onConfirm={onConfirm}
      isModalOpen={true}
    />
  );
};
