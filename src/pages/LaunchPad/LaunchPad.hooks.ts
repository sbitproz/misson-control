import { useEffect, useState } from "react";
import { LaunchButtonMap, LaunchStatusUnion } from "./LaunchPad.constants";
import { pressLaunch, useLaunchRocket } from "./LaunchPad.services";

export interface UseLaunchPadProps {
  url: string;
  delaySeconds: number;
  timeoutSeconds?: number;
  initialState: LaunchStatusUnion;
}

export const useLaunchPad = ({
  url,
  delaySeconds = 2,
  timeoutSeconds,
  initialState,
}: UseLaunchPadProps) => {
  const rocketResponse = useLaunchRocket();
  const [rocketStatus, setRocketStatus] =
    useState<LaunchStatusUnion>(initialState);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setRocketStatus(rocketResponse.status);
    setShowTooltip(rocketResponse.status === "aborted");
  }, [rocketResponse]);

  useEffect(() => {
    setRocketStatus(initialState);
  }, [initialState]);

  const buttonConfig = LaunchButtonMap[rocketStatus];

  const onLaunchRocket = () => {
    if (rocketStatus !== "disabled") {
      pressLaunch({ delaySeconds, url, status: rocketStatus, timeoutSeconds });
      setRocketStatus("working");
    }
  };

  const shouldShowTooltip = (hover: boolean) => {
    if (rocketStatus === "aborted") return true;

    if (rocketStatus === "disabled") return false;

    return hover;
  };

  const onToggleTooltip = (hover: boolean) => {
    setShowTooltip(shouldShowTooltip(hover));
  };

  return {
    buttonConfig,
    onLaunchRocket,
    showTooltip,
    onToggleTooltip,
  };
};
