import { createSignal } from "@react-rxjs/utils";
import { bind } from "@react-rxjs/core";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError, switchMap, startWith } from "rxjs/operators";
import { LaunchStatus, LaunchStatusUnion } from "./LaunchPad.constants";
import { timeoutWhen } from "common/util/timeoutWhen";

export interface Launch {
  delaySeconds: number;
  timeoutSeconds?: number;
  url: string;
  status: LaunchStatusUnion;
}

export const [launchedPressed$, pressLaunch] = createSignal<Launch>();

export const [useLaunchRocket, launchRocket$] = bind(
  launchedPressed$.pipe(
    switchMap(({ delaySeconds, url, status, timeoutSeconds }) => {
      return status === LaunchStatus.WORKING
        ? of(LaunchStatus.ABORTED)
        : ajax.getJSON(`${url}${delaySeconds}`).pipe(
            map(() => LaunchStatus.STANDBY),
            timeoutWhen(!!timeoutSeconds, (timeoutSeconds ?? 10) * 1000),
            catchError(() => of(LaunchStatus.ABORTED)),
          );
    }),
    map((status) => ({ status })),
    startWith({ status: LaunchStatus.STANDBY }),
  ),
);
