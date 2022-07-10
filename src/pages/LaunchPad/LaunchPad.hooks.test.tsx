import { renderHook, waitFor } from "@testing-library/react";
import { useLaunchPad, UseLaunchPadProps } from "./LaunchPad.hooks";
import { Subscribe } from "@react-rxjs/core";
import { LaunchButtonMap } from "./LaunchPad.constants";
import * as launchPadServicesModule from "./LaunchPad.services";
jest.mock("./LaunchPad.services", () => ({
  ...jest.requireActual("./LaunchPad.services"),
  pressLaunch: jest.fn(),
}));

const initialProps = {
  url: "www.google.com",
  delaySeconds: 2,
  timeoutSeconds: 1,
  initialState: "standby",
} as UseLaunchPadProps;

const { pressLaunch } = launchPadServicesModule as jest.Mocked<
  typeof launchPadServicesModule
>;

const wrapper = ({ children }: any) => <Subscribe>{children}</Subscribe>;
describe("LaunchPad Hooks", () => {
  describe("showTooltip and onToggleTooltip", () => {
    it("should not show tooltip when rocket status is standby", () => {
      const { result } = renderHook(useLaunchPad, { initialProps, wrapper });
      expect(result.current.showTooltip).toBe(false);
    });

    it("should show tooltip when rocket status is standby and hover is true", async () => {
      const { result } = renderHook(useLaunchPad, { initialProps, wrapper });
      await waitFor(() => result.current.onToggleTooltip(true));
      await waitFor(() => expect(result.current.showTooltip).toBe(true));
    });

    it("should show tooltip when rocket status is aborted and hover is true", async () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps: { ...initialProps, initialState: "aborted" },
        wrapper,
      });
      await waitFor(() => result.current.onToggleTooltip(true));
      await waitFor(() => expect(result.current.showTooltip).toBe(true));
    });

    it("should not show tooltip when rocket status is disabled and hover is true", async () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps: { ...initialProps, initialState: "disabled" },
        wrapper,
      });
      await waitFor(() => result.current.onToggleTooltip(true));
      await waitFor(() => expect(result.current.showTooltip).toBe(false));
    });

    it("should show tooltip when rocket status is working and hover is true", async () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps: { ...initialProps, initialState: "working" },
        wrapper,
      });
      await waitFor(() => result.current.onToggleTooltip(true));
      await waitFor(() => expect(result.current.showTooltip).toBe(true));
    });

    it("should not show tooltip when rocket status is working and hover is false", async () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps: { ...initialProps, initialState: "working" },
        wrapper,
      });
      await waitFor(() => result.current.onToggleTooltip(false));
      await waitFor(() => expect(result.current.showTooltip).toBe(false));
    });

    it("should not show tooltip when rocket status is standby and hover is false", async () => {
      const { result } = renderHook(useLaunchPad, { initialProps, wrapper });
      await waitFor(() => result.current.onToggleTooltip(false));
      await waitFor(() => expect(result.current.showTooltip).toBe(false));
    });
  });

  describe("buttonConfig", () => {
    it("should show aborted button config when rocket status is aborted", () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps: { ...initialProps, initialState: "aborted" },
        wrapper,
      });
      expect(result.current.buttonConfig).toBe(LaunchButtonMap["aborted"]);
    });

    it("should show working button config when rocket status is working", () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps: { ...initialProps, initialState: "working" },
        wrapper,
      });
      expect(result.current.buttonConfig).toBe(LaunchButtonMap["working"]);
    });

    it("should show standby button config when rocket status is standby", () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps: { ...initialProps, initialState: "standby" },
        wrapper,
      });
      expect(result.current.buttonConfig).toBe(LaunchButtonMap["standby"]);
    });

    it("should show disabled button config when rocket status is disabled", () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps: { ...initialProps, initialState: "disabled" },
        wrapper,
      });
      expect(result.current.buttonConfig).toBe(LaunchButtonMap["disabled"]);
    });
  });

  describe("onLaunchRocket", () => {
    it("should call pressLaunch when onLaunchRocket is called", async () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps,
        wrapper,
      });
      await waitFor(() => result.current.onLaunchRocket());
      await waitFor(() => expect(pressLaunch).toHaveBeenCalled());
    });

    it("should set rocket status to working when rocket status is not disabled and onLaunchRocket is called", async () => {
      const { result } = renderHook(useLaunchPad, { initialProps, wrapper });
      await waitFor(() => result.current.onLaunchRocket());
      await waitFor(() =>
        expect(result.current.buttonConfig).toBe(LaunchButtonMap["working"]),
      );
    });

    it("should not set rocket status to working when rocket status is disabled and onLaunchRocket is called", async () => {
      const { result } = renderHook(useLaunchPad, {
        initialProps: { ...initialProps, initialState: "disabled" },
        wrapper,
      });
      await waitFor(() => result.current.onLaunchRocket());
      await waitFor(() =>
        expect(result.current.buttonConfig).toBe(LaunchButtonMap["disabled"]),
      );
    });
  });
});
