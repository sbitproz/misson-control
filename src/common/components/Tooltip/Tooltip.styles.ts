import TippyBase from "@tippyjs/react";
import { VariantStyleProp } from "common/interfaces/variant.interfaces";
import styled from "styled-components";

export const Tippy = styled(TippyBase)`
  background: ${({ theme, variant }: VariantStyleProp) => `${theme[variant]}`};
  .tippy-arrow {
    color: ${({ theme, variant }: VariantStyleProp) => `${theme[variant]}`};
  }
`;
