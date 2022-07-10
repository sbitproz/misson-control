import { catchError, delay, of, tap, Subject, switchMap } from "rxjs";
import { timeoutWhen } from "./timeoutWhen";
import { TestScheduler } from "rxjs/testing";

describe("timeoutWhen", () => {
  let testScheduler: TestScheduler;

  const setupScheduler = () =>
    new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

  const makeRequest = (timeToDelayMs: number) =>
    of("Complete").pipe(delay(timeToDelayMs));

  const setupPipeline = (
    delayMs: number,
    timoutMs: number,
    condition: boolean = true,
  ) => {
    const rootSource$ = new Subject();
    const result$ = rootSource$.pipe(
      switchMap(() =>
        makeRequest(delayMs).pipe(
          timeoutWhen(condition, timoutMs),
          catchError(() => of("error")),
        ),
      ),
    );
    return { rootSource$, result$ };
  };

  it("should throw and error when the delay time exceeds the timeout and the predicate is true", async () => {
    const { rootSource$, result$ } = setupPipeline(1500, 1000);
    testScheduler = setupScheduler();

    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const payloadA = { a: {} };
      const expectedA = { a: "error" };

      const source$ = cold("a", payloadA).pipe(tap((a) => rootSource$.next(a)));

      expectObservable(source$).toBe("a", payloadA);
      expectObservable(result$).toBe("1000ms (a-)", expectedA);
    });
  });

  it("should return complete when the timeout exceeds the delay and the predicate is true", async () => {
    testScheduler = setupScheduler();
    const { rootSource$, result$ } = setupPipeline(1000, 1500);

    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const payloadA = { a: {} };
      const expectedA = { a: "Complete" };

      const source$ = cold("a", payloadA).pipe(tap((a) => rootSource$.next(a)));

      expectObservable(source$).toBe("a", payloadA);
      expectObservable(result$).toBe("1000ms (a-)", expectedA);
    });
  });

  it("should return complete when the predicate is false", async () => {
    testScheduler = setupScheduler();
    const { rootSource$, result$ } = setupPipeline(1000, 1500, false);

    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const payloadA = { a: {} };
      const expectedA = { a: "Complete" };

      const source$ = cold("a", payloadA).pipe(tap((a) => rootSource$.next(a)));

      expectObservable(source$).toBe("a", payloadA);
      expectObservable(result$).toBe("1000ms (a-)", expectedA);
    });
  });
});
