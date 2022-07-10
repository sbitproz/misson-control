import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { theme } from "theme/theme";
import { LaunchPad } from "./LaunchPad";
import { LaunchButtonMap } from "./LaunchPad.constants";
import * as launchPadHooksModule from "./LaunchPad.hooks";
jest.mock("./LaunchPad.hooks");
jest.mock("common/components/Tooltip/Tooltip.styles", () => ({
  Tippy: ({ children, visible }: any) => (
    <div>
      {visible && <div data-testid="tooltip">Tooltip</div>}
      {children}
    </div>
  ),
}));

const { useLaunchPad } = launchPadHooksModule as jest.Mocked<
  typeof launchPadHooksModule
>;

describe("LaunchPad", () => {
  const props = {
    delaySeconds: 2,
    url: "www.google.com",
  };

  const useLaunchPadProps = {
    buttonConfig: LaunchButtonMap["working"],
    onLaunchRocket: jest.fn(),
    showTooltip: false,
    onToggleTooltip: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    useLaunchPad.mockReturnValue(useLaunchPadProps);
  });

  it("should render the launch pad", () => {
    render(<LaunchPad {...props} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onLaunchRocket when button is clicked", () => {
    render(<LaunchPad {...props} />);
    userEvent.click(screen.getByRole("button"));
    expect(useLaunchPadProps.onLaunchRocket).toHaveBeenCalled();
  });

  it("should call onToggleTooltip when user is hovering over the button", () => {
    render(<LaunchPad {...props} />);
    userEvent.hover(screen.getByRole("button"));
    expect(useLaunchPadProps.onToggleTooltip).toHaveBeenCalled();
  });

  it("should show working label text when rocket status is working", () => {
    render(<LaunchPad {...props} initialState="working" />);
    userEvent.hover(screen.getByRole("button"));
    expect(
      screen.getByText(LaunchButtonMap["working"].label),
    ).toHaveTextContent(LaunchButtonMap["working"].label);
  });
  it("should render working button when variant is working", async () => {
    render(
      <ThemeProvider theme={theme}>
        <LaunchPad {...props} initialState="working" />
      </ThemeProvider>,
    );
    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveStyle(
        "border: 2px solid #ff7900",
      ),
    );
  });

  it("should render tooltip when showTooltip is true", () => {
    useLaunchPad.mockReturnValue({ ...useLaunchPadProps, showTooltip: true });
    render(<LaunchPad {...props} />);
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });
});
