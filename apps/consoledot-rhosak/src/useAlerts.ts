import { addNotification } from "@redhat-cloud-services/frontend-components-notifications";
import type { ReactNode } from "react";
import { useDispatch } from "react-redux";

export const useAlerts = () => {
  const dispatch = useDispatch();

  const addAlert = (
    variant: "default" | "success" | "danger" | "warning" | "info" | undefined,
    message: string,
    dismissable: boolean | undefined,
    id?: string | number | undefined,
    description?: ReactNode
  ) => {
    dispatch(
      addNotification({
        variant: variant,
        title: message,
        description: description,
        dismissable: dismissable,
        id: id,
      })
    );
  };

  return { addAlert };
};
