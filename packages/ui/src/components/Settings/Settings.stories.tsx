import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { apiError, fakeApi } from "../storiesHelpers";
import { Settings } from "./Settings";

export default {
  component: Settings,
  args: {
    reauthenticationEnabled: true,
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof Settings>;

export const InteractiveExample: ComponentStory<typeof Settings> = (args) => {
  const [reauthenticationEnabled, setReauthenticationEnabled] =
    useState<boolean>(true);

  const onSubmitReAuthentication = (connectionStatus: boolean) => {
    setReauthenticationEnabled(connectionStatus);
    return fakeApi(connectionStatus, 4000);
  };

  return (
    <Settings
      {...args}
      onSubmitReAuthentication={onSubmitReAuthentication}
      reauthenticationEnabled={reauthenticationEnabled}
    />
  );
};

export const TurningOnConnectionReauthentication: ComponentStory<
  typeof Settings
> = (args) => {
  const [reauthenticationEnabled, setReauthenticationEnabled] =
    useState<boolean>(false);

  const onSubmitReAuthentication = (connectionStatus: boolean) => {
    setReauthenticationEnabled(connectionStatus);
    return fakeApi(connectionStatus, 4000);
  };

  return (
    <Settings
      {...args}
      onSubmitReAuthentication={onSubmitReAuthentication}
      reauthenticationEnabled={reauthenticationEnabled}
    />
  );
};

export const TurnOnConnectionFailure: ComponentStory<typeof Settings> = (
  args
) => {
  const onSubmitReAuthentication = (connectionStatus: boolean) => {
    return apiError(connectionStatus, 4000);
  };

  return (
    <Settings
      {...args}
      onSubmitReAuthentication={onSubmitReAuthentication}
      reauthenticationEnabled={false}
    />
  );
};

export const TurnOffConnectionFailure: ComponentStory<typeof Settings> = (
  args
) => {
  const onSubmitReAuthentication = (connectionStatus: boolean) => {
    return apiError(connectionStatus, 4000);
  };

  return (
    <Settings
      {...args}
      onSubmitReAuthentication={onSubmitReAuthentication}
      reauthenticationEnabled={true}
    />
  );
};
