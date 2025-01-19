import React from "react";
import { Box, Typography, Slide, IconButton } from "@mui/material";
import { CgClose } from "react-icons/cg";

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "background.paper",
          zIndex: 1300,
          boxShadow: 3,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            pb: 1,
            mb: 2,
          }}
        >
          <Typography variant="h6">Search</Typography>
          <IconButton onClick={onClose}>
            <CgClose />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>{children}</Box>
      </Box>
    </Slide>
  );
};

export default SlidingPanel;
