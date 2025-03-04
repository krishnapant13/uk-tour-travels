import { Button } from "@mui/material";
import React from "react";

interface CustomButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  sx?: object;
  hideOn?: "small" | "large";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onClick,
  variant = "contained",
  color = "primary",
  sx = {},
  hideOn,
  type = "button",
}) => {
  const display =
    hideOn === "small"
      ? { xs: "none", md: "block" }
      : hideOn === "large"
      ? { xs: "block", md: "none" }
      : { xs: "block", md: "block" };

  return (
    <Button
      variant={variant}
      color={color}
      sx={{
        display,
        ...sx,
      }}
      onClick={type === "submit" ? undefined : onClick}
      className="w-full"
      type={type}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
