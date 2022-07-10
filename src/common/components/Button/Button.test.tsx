import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { theme } from "theme/theme";
import { Button, ButtonProps } from "./Button";

describe("Name of the group", () => {
  const props: ButtonProps = {
    label: "My Button",
    variant: "default",
    onClick: jest.fn(),
    onFocus: jest.fn(),
    onHover: jest.fn(),
  };

  const setupTests = (override: Partial<ButtonProps> = {}) =>
    render(
      <ThemeProvider theme={theme}>
        <Button {...props} {...override}>
          {props.label}
        </Button>
      </ThemeProvider>,
    );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render button with label", () => {
    setupTests();
    expect(screen.getByText(props.label)).toBeInTheDocument();
  });

  it("should render default button when variant is default", () => {
    setupTests({ variant: "default" });
    expect(screen.getByRole("button")).toHaveStyle("border: 2px solid #000000");
  });

  it("should render disabled button when variant is disabled", () => {
    setupTests({ variant: "disabled" });
    expect(screen.getByRole("button")).toHaveStyle("border: 2px solid #000000");
    expect(screen.getByText(props.label)).toHaveStyle(
      "color: rgba(0, 0, 0, 0.702)",
    );
  });

  it("should render error button when variant is error", () => {
    setupTests({ variant: "error" });
    expect(screen.getByRole("button")).toHaveStyle("border: 2px solid #ff0000");
  });

  it("should render working button when variant is working", () => {
    setupTests({ variant: "working" });
    expect(screen.getByRole("button")).toHaveStyle("border: 2px solid #ff7900");
  });

  it("should trigger onClick when button is clicked", () => {
    setupTests();
    userEvent.click(screen.getByRole("button"));
    expect(props.onClick).toHaveBeenCalled();
  });

  it("should trigger onHover when mouse is over the button", () => {
    setupTests();
    userEvent.hover(screen.getByRole("button"));
    expect(props.onHover).toHaveBeenCalled();
  });

  it("should trigger onFocus when mouse is focused", () => {
    setupTests();
    screen.getByRole("button").focus();
    expect(props.onFocus).toHaveBeenCalled();
  });
});
