import {
  ErrorCodes,
  useKafka,
  usePrincipalApiFetchQuery,
} from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import type { ChangeOwnerErrorMessage } from "ui";
import { ChangeKafkaOwner } from "ui";
import { useUpdateKafkaMutation } from "consoledot-api";
//import {usePrincipalApiFetchQuery} from "../../../../../../packages/consoledot-api/src/fetchQueries"

import type {
  ControlPlaneNavigationProps,
  ControlPlaneRouteParams,
} from "../routesConsts";
import { ControlPlaneRoutePath } from "../routesConsts";
import { isServiceApiError } from "@rhoas/registry-management-sdk";

export const ChangeOwnerRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const history = useHistory();
  const match = useRouteMatch<ControlPlaneRouteParams>(ControlPlaneRoutePath);

  /*const data = usePrincipalApiFetchQuery()
  const princiapls = async ()=>{
   const value= await Promise.all([data])
   console.log(value)
    //await usePrincipalApiFetchQuery().then((response)
   
  }
  */

  const updateInstance = useUpdateKafkaMutation();

  const { data: instance } = useKafka(match?.params.id);

  const onCancel = useCallback(() => {
    history.push(instancesHref);
  }, [history, instancesHref]);

  const onConfirm = useCallback(
    async (newOwner: string) => {
      try {
        await updateInstance.mutateAsync({
          id: instance?.id || "",
          updates: { owner: newOwner },
        });
        onCancel();
      } catch (error) {
        if (isServiceApiError(error))
          if (error?.response?.data.code === ErrorCodes.OWNER_DOES_NOT_EXIST)
            return "invalid-user" as ChangeOwnerErrorMessage;
          else if (error?.response?.data.code)
            return "unknown-error" as ChangeOwnerErrorMessage;
      }
    },
    [instance?.id, onCancel, updateInstance]
  );

  return (
    <ChangeKafkaOwner
      isModalOpen={true}
      currentOwner={instance?.owner || ""}
      accounts={[{ id: "hema_kafka_devexp", displayName: "Hema HG" }]}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};
