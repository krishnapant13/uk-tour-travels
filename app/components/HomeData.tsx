"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import { FaRegCreditCard } from "react-icons/fa";
import { IoIosTimer, IoMdCheckmarkCircleOutline } from "react-icons/io";
import ImageGrid from "./ImageGrid";
import SlidingPanel from "./SlidingPanel";
import SwitchTab from "./SwitchTab";
import CustomButton from "./CustomButton";
import Navbar from "./Navbar";
import Enquiry from "./Enquiry";

interface HomeComponentProps {
  title: string;
  description: string;
  imageSrc: string | string[];
}

const HomeData: React.FC<HomeComponentProps> = ({
  title,
  description,
  imageSrc,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <main className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-full gap-4 py-5 mt-16 mb-4">
        <div className="flex flex-col justify-between md:justify-start items-start h-full md:space-y-4 space-y-10">
          {/* Enquiry Form */}
          <Enquiry />

          {/* Main Heading (SEO Boost) */}
          <h1 className="text-[2em] md:text-5xl font-bold text-gray-800 leading-snug">
            {title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-snug">
            {description}
          </p>

          {/* Call-to-Action Button */}
          <CustomButton
            hideOn="large"
            onClick={toggleSearch}
            title="Look for Vehicle Booking"
          />
        </div>

        {/* Image Grid */}
        <ImageGrid imageSrc={imageSrc} />
      </section>

      <SwitchTab
        showCapsuleTabs={true}
        absolutePosition={{
          bottom: "37%",
          left: "0",
          transform: "translateX(0)",
        }}
      />

      {/* Features Section */}
      <section
        className="hidden md:flex flex-col md:flex-row justify-between md:justify-center items-center w-full mt-10 ml-8 md:ml-auto pb-20 border-b border-gray-300"
        aria-label="Key Features"
      >
        {/* Feature: Checked Vehicles */}
        <div className="flex items-center md:w-full text-center md:text-left mb-4">
          <IoMdCheckmarkCircleOutline className="mr-2" color="blue" size={25} />
          <p>Checked Only Vehicles</p>
        </div>

        {/* Feature: Real-time Confirmation */}
        <div className="flex items-center md:w-full text-center md:text-left mb-4">
          <IoIosTimer className="mr-2" color="blue" size={25} />
          <p>Real-Time Confirmation</p>
        </div>

        {/* Feature: Safe Payments */}
        <div className="flex items-center md:w-full text-center md:text-left">
          <FaRegCreditCard className="mr-2" color="blue" size={25} />
          <p>Safe Payments</p>
        </div>
      </section>

      {/* Sliding Panel for Search */}
      <SlidingPanel isOpen={isSearchOpen} onClose={toggleSearch}>
        <Box>
          <SwitchTab showCapsuleTabs={true} mobileView={true} />
        </Box>
      </SlidingPanel>
    </main>
  );
};

export default HomeData;
