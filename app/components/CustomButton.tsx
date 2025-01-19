import { Button } from "@mui/material";
import React from "react";

interface CustomButtonProps {
  title: string;
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
      onClick={onClick}
      className="w-full"
    >
      {title}
    </Button>
  );
};

export default CustomButton;
