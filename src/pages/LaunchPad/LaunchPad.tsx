import React from "react";
import { Button } from "common/components/Button/Button";
import { LaunchStatusUnion } from "./LaunchPad.constants";
import { Tippy } from "common/components/Tooltip/Tooltip.styles";
import { useLaunchPad } from "./LaunchPad.hooks";

interface LaunchPadProps {
  url: string;
  delaySeconds: number;
  timeoutSeconds?: number;
  initialState?: LaunchStatusUnion;
}

export const LaunchPad: React.FC<LaunchPadProps> = ({
  url,
  delaySeconds = 2,
  timeoutSeconds,
  initialState = "standby",
}) => {
  const { showTooltip, onLaunchRocket, buttonConfig, onToggleTooltip } =
    useLaunchPad({ url, delaySeconds, timeoutSeconds, initialState });
  return (
    <Tippy
      content={buttonConfig.tooltip}
      visible={showTooltip}
      variant={buttonConfig.variant}
    >
      <Button
        label={buttonConfig.label}
        variant={buttonConfig.variant}
        onClick={onLaunchRocket}
        onHover={onToggleTooltip}
        onFocus={() => onToggleTooltip(true)}
      />
    </Tippy>
  );
};
