export const colors = {
  text: "#1B1B1B",
  placeholder: "#737373",
  border: "#545454",
  success: "#32BE50",
  error: "#DC3545",
  background: "#FFFFFF",
  disabledOpacity: 0.6,
};

export const spacing = {
  containerMaxWidth: "311px",
  borderRadius: "27px",
  paddingX: "24px",
  paddingY: "12px",
  iconGap: "8px",
  labelMarginBottom: "8px",
  messageMarginTop: "6px",
  suffixIconRight: "24px",
  suffixIconPadding: "48px",
};

export const typography = {
  label: { size: "16px", weight: 850, lineHeight: "24px" },
  input: { size: "16px", lineHeight: "normal" },
  message: { size: "12px", weight: 400, lineHeight: "16px" },
};

export const iconSizes = {
  labelIcon: 20,
  suffixIcon: 16,
};

export type InputState = "default" | "success" | "error" | "disabled";
