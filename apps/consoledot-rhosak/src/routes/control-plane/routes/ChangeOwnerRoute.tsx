import { useKafka } from "consoledot-api";
import { FunctionComponent, useCallback } from "react";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ChangeKafkaOwner } from "ui";
import { useUpdateKafkaMutation } from "consoledot-api";

import type {
  ControlPlaneNavigationProps,
  ControlPlaneRouteParams,
} from "../routesConsts";
import { ControlPlaneRoutePath } from "../routesConsts";

export const ChangeOwnerRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const history = useHistory();
  const match = useRouteMatch<ControlPlaneRouteParams>(ControlPlaneRoutePath);

  //const updateInstance = useUpdateKafkaMutation();

  const { data: instance } = useKafka(match?.params.id);

  const onCancel = useCallback(() => {
    history.push(instancesHref);
  }, [history, instancesHref]);

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
      isModalOpen={true}
      currentOwner={instance?.owner || ""}
      accounts={[]}
      onConfirm={() => { }}
      onCancel={onCancel}
    />
  );
};
