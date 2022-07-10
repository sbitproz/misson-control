import {
  Variant,
  VariantStyleProp,
} from "common/interfaces/variant.interfaces";
import styled from "styled-components";

const disabledText = (variant: Variant) => (variant === "disabled" ? "B3" : "");

export const StyledButton = styled.button`
  background: #ffffff;
  color: palevioletred;
  font-size: 12px;
  margin: 1em;
  padding: 13px 27px;
  min-width: 140px;
  border: 2px solid palevioletred;
  border: 2px solid ${({ theme, variant }: VariantStyleProp) => theme[variant]};
  color: ${({ theme, variant }: VariantStyleProp) =>
    `${theme[variant]}${disabledText(variant)}`};
`;
