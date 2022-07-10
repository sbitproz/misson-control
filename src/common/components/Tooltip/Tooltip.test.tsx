import { render, screen } from "@testing-library/react";
import {
  Variant,
  VariantStyleProp,
} from "common/interfaces/variant.interfaces";
import { ThemeProvider } from "styled-components";
import { theme } from "theme/theme";
import { Tippy } from "./Tooltip.styles";

describe("Name of the group", () => {
  const props: { variant: Variant; content: string } = {
    variant: "default",
    content: "this is a tooltip",
  };

  const setupTests = (override: Partial<VariantStyleProp> = {}) =>
    render(
      <ThemeProvider theme={theme}>
        <Tippy visible={true} {...props} {...override}>
          <button>Test</button>
        </Tippy>
      </ThemeProvider>,
    );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render tooltip with label", () => {
    setupTests();
    expect(screen.getByText(props.content)).toBeInTheDocument();
  });

  it("should render default tooltip when variant is default", () => {
    setupTests({ variant: "default" });
    expect(screen.getByRole("tooltip")).toHaveStyle("background: rgb(0, 0, 0)");
  });

  it("should render error tooltip", () => {
    setupTests({ variant: "error" });
    expect(screen.getByRole("tooltip")).toHaveStyle(
      "background: rgb(255, 0, 0)",
    );
  });

  it("should render disabled button when variant is working", () => {
    setupTests({ variant: "working" });
    expect(screen.getByRole("tooltip")).toHaveStyle(
      "background: rgb(255, 121, 0)",
    );
  });
});
