import { Launch, pressLaunch, launchRocket$ } from "./LaunchPad.services";
import { TestScheduler } from "rxjs/testing";
import { of, tap } from "rxjs";
import * as rxjsAjaxModule from "rxjs/ajax";
jest.mock("rxjs/ajax");

const { ajax } = rxjsAjaxModule as jest.Mocked<typeof rxjsAjaxModule>;

describe("LaunchPad Services", () => {
  let testScheduler: TestScheduler;

  const setupScheduler = () =>
    new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

  beforeEach(() => {
    testScheduler = setupScheduler();
  });

  it("should emit standby when call status is standby and pressLaunch is called without aborting", () => {
    (ajax.getJSON as jest.Mock).mockImplementation(() => of("test"));

    testScheduler.run(async (helpers) => {
      const { cold, expectObservable } = helpers;
      const payloadA: { a: Launch } = {
        a: {
          delaySeconds: 1,
          status: "standby",
          url: "www.google.com",
          timeoutSeconds: 2,
        },
      };
      const expectedA = { a: { status: "standby" }, b: { status: "standby" } };

      const source$ = cold("a", payloadA).pipe(tap((a) => pressLaunch(a)));

      expectObservable(source$).toBe("a", payloadA);
      expectObservable(launchRocket$).toBe("(ab)", expectedA);
    });
  });

  it("should emit aborted when status is working and pressLaunch is called", () => {
    testScheduler.run(async (helpers) => {
      const { cold, expectObservable } = helpers;
      const payloadA: { a: Launch } = {
        a: {
          delaySeconds: 1,
          status: "working",
          url: "www.google.com",
          timeoutSeconds: 2,
        },
      };
      const expectedA = { a: { status: "standby" }, b: { status: "aborted" } };

      const source$ = cold("a", payloadA).pipe(tap((a) => pressLaunch(a)));

      expectObservable(source$).toBe("a", payloadA);
      expectObservable(launchRocket$).toBe("(ab)", expectedA);
    });
  });

  it.todo(
    "should normalise negative delay values and emit standby when status is standby and pressLaunch is called",
  );

  it.todo(
    "should return null when an a bad url is entered (though outside the project scope null should be mapped to an abort)",
  );

  it.todo(
    "should normalise negative timeout secounds when timeout is a negative number",
  );
});
