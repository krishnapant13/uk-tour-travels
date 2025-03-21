"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import SlidingPanel from "./SlidingPanel"; 
import SwitchTab from "./SwitchTab";
import CustomButton from "./CustomButton";

const SlidingPanelClient = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <>
      {/* Trigger Button */}
      <CustomButton
        hideOn="large"
        onClick={toggleSearch}
        title="Look for Vehicle Booking"
        aria-label="Book your taxi or tour now"
      />

      {/* Sliding Panel */}
      <SlidingPanel isOpen={isSearchOpen} onClose={toggleSearch}>
        <Box>
          <SwitchTab showCapsuleTabs={true} mobileView={true} />
        </Box>
      </SlidingPanel>
    </>
  );
};

export default SlidingPanelClient;
