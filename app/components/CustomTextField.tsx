import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      sx={{
        width: { xs: "100%", sm: "100%", md: "auto", lg: "auto", xl: "auto" },
        "& .MuiFilledInput-root": {
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#c9c9c9",
          },
          "&:before, &:after": {
            display: "none",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#757575",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#1976D2",
        },
        ...props.sx,
      }}
      variant={props.variant || "filled"}
    />
  );
};

export default CustomTextField;
