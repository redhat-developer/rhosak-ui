import { addNotification } from "@redhat-cloud-services/frontend-components-notifications";
import { useDispatch } from "react-redux";

export const useAlerts = () => {
  const dispatch = useDispatch();

  const addAlert = (
    variant: "default" | "success" | "danger" | "warning" | "info" | undefined,
    message: string,
    dismissable: boolean | undefined,
    id?: string | number | undefined,
    description?: string
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
