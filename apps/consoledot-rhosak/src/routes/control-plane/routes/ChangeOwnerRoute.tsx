import { useKafka } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useState } from "react";
//import { useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
import { ChangeKafkaOwner } from "ui";
import { useUpdateKafkaMutation } from "consoledot-api";

import type {
  ControlPlaneNavigationProps,
  ControlPlaneRouteParams,
} from "../routesConsts";
import { ControlPlaneRoutePath } from "../routesConsts";

export const ChangeOwnerRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = () => {
  //const history = useHistory();
  const match = useRouteMatch<ControlPlaneRouteParams>(ControlPlaneRoutePath);

  //const [selectedOwner,setSelectedOwner] = useState<string|undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  //const updateInstance = useUpdateKafkaMutation();

  const { data: instance } = useKafka(match?.params.id);

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onSuccess = () => {
    setIsModalOpen(false);
  };
  //TODO Update the Kafka instance on confirm

  /*const onConfirm = useCallback(
    async (newOwner:string) => {
      try {
        await updateInstance.mutateAsync({
          id: instance?.id||'',
          updates: { owner: newOwner },
        });
        onSuccess()
        
      } catch(error) {
        return error
      }
    },
    [instance, updateInstance]
  );
  */

  return (
    <ChangeKafkaOwner
      isModalOpen={isModalOpen}
      currentOwner={instance?.owner || ""}
      accounts={[]}
      onConfirm={() => {}}
      onCancel={onCancel}
    />
  );
};
