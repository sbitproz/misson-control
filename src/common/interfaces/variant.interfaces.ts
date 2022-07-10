export type Variant = "default" | "disabled" | "working" | "error";

export type VariantStyle = {
  [key in Variant]: string;
};

export type VariantStyleProp = {
  theme: any;
  variant: Variant;
};
