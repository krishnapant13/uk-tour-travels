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

  // https://opencagedata.com/dashboard#geocoding

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  return (
    <main className=" relative ">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-4 py-5 mt-16 mb-4">
        <div className="flex flex-col justify-between md:justify-center items-start h-full md:space-y-4 space-y-10 ">
          <Enquiry />

          <h2 className="text-[2em] md:text-6xl font-bold text-gray-800 leading-snug">
            {title}
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-snug">
            {description}
          </p>

          <CustomButton
            hideOn="large"
            onClick={toggleSearch}
            title="Start Your Search"
          />
        </div>
        <ImageGrid imageSrc={imageSrc} />
      </div>
      <SwitchTab
        showCapsuleTabs={true}
        absolutePosition={{
          bottom: "40%",
          left: "0",
          transform: "translateX(0)",
        }}
      />
      <div className="hidden md:flex flex-col md:flex-row justify-between md:justify-center md:h-auto items-center w-full mt-10 ml-8 md:ml-auto pb-20 border-b border-gray-300 ">
        <div className="flex flex-row md:justify-center justify-start items-center md:w-full text-center md:text-left mb-4">
          <IoMdCheckmarkCircleOutline className="mr-2" color="blue" size={25} />
          <p>Checked Only Vehicles</p>
        </div>

        <div className="flex flex-row md:justify-center justify-start items-center   md:w-full text-center md:text-left mb-4">
          <IoIosTimer className="mr-2" color="blue" size={25} />
          <p>Real Time Confirmation</p>
        </div>

        <div className="flex flex-row md:justify-center justify-start items-center   md:w-full text-center md:text-left">
          <FaRegCreditCard className="mr-2" color="blue" size={25} />
          <p>Safe payments</p>
        </div>
      </div>
      <SlidingPanel isOpen={isSearchOpen} onClose={toggleSearch}>
        {/* Add your search form or content here */}
        <Box>
          <SwitchTab showCapsuleTabs={true} mobileView={true} />
        </Box>
      </SlidingPanel>
    </main>
  );
};

export default HomeData;
