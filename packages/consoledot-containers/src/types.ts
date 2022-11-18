import type { ReactChild } from "react";

export type PageRoute = {
  sendNotification: (options: {
    variant: "default" | "success" | "danger" | "warning" | "info" | undefined;
    title: ReactChild;
    description?: ReactChild;
    dismissable?: boolean | undefined;
  }) => void;
};
