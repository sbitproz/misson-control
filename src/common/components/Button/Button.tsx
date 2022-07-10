import { Variant } from "common/interfaces/variant.interfaces";
import React, { forwardRef } from "react";
import { StyledButton } from "./Button.styles";

export interface ButtonProps {
  variant: Variant;
  label: string;
  onClick: () => void;
  onHover: (hover: boolean) => void;
  onFocus: () => void;
}

export const Button: React.FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ variant, label, onClick, onHover, onFocus }, ref) => {
  return (
    <StyledButton
      ref={ref}
      tabIndex={0}
      variant={variant}
      onMouseOver={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onFocus()}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
});
