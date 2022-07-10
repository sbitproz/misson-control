import { Variant } from "common/interfaces/variant.interfaces";

export enum LaunchStatus {
  DISABLED = "disabled",
  STANDBY = "standby",
  WORKING = "working",
  ABORTED = "aborted",
}

export type LaunchStatusUnion = `${LaunchStatus}`;

interface ButtonMap {
  [key: string]: {
    variant: Variant;
    label: string;
    tooltip?: string;
  };
}

export const LaunchButtonMap: ButtonMap = {
  [LaunchStatus.WORKING]: {
    variant: "working",
    label: "Working",
    tooltip: "Cancel launch",
  },
  [LaunchStatus.STANDBY]: {
    variant: "default",
    label: "Launch Rocket",
    tooltip: "Ignites the fuel",
  },
  [LaunchStatus.ABORTED]: {
    variant: "error",
    label: "Launch Rocket",
    tooltip: "Rocket errored",
  },
  [LaunchStatus.DISABLED]: {
    variant: "disabled",
    label: "Launch Rocket",
    tooltip: "",
  },
};
