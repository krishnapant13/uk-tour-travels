"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import VehicleCarousel from "../components/VehicleCarousel";
import { FaArrowRightLong, FaPencil } from "react-icons/fa6";
import dynamic from "next/dynamic";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import SwitchTab from "../components/SwitchTab";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

const ResultPage: React.FC = () => {
  const searchParams = useSearchParams();
  const fromData = searchParams.get("fromData") || "Starting Point";
  const toData = searchParams.get("toData") || "Destination";
  const attractionData = searchParams.get("attractionData") || "Attraction";
  const fromLat = parseFloat(searchParams.get("fromLatData") || "0");
  const fromLon = parseFloat(searchParams.get("fromLonData") || "0");
  const toLat = parseFloat(searchParams.get("toLatData") || "0");
  const toLon = parseFloat(searchParams.get("toLonData") || "0");
  const attractionLat = parseFloat(
    searchParams.get("attractionLatData") || "0"
  );
  const attractionLon = parseFloat(
    searchParams.get("attractionLonData") || "0"
  );
  const passengers = searchParams.get("passengers") || "1";
  // const [showSwitchTab, setShowSwitchTab] = useState(false);

  return (
    <div className="relative">
      {/* <motion.div
        initial={{ y: "180%", opacity: 0 }}
        animate={{
          y: showSwitchTab ? "-10%" : "-180%",
          opacity: showSwitchTab ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 100 }}
        className="absolute top-0 left-0 w-full shadow-md p-4 z-50"
      >
        <SwitchTab />
      </motion.div> */}
      <Navbar />
      <div className="info-bar w-full h-auto p-2 flex flex-wrap justify-evenly items-center bg-gray-200 mt-16 shadow-md relative">
        <div className="flex justify-center items-center pr-4 border-r border-black">
          <p
            className="whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ maxWidth: "15ch" }}
          >
            {fromData}
          </p>
          <FaArrowRightLong className="mx-3" />
          <p
            className="whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ maxWidth: "15ch" }}
          >
            {toData || attractionData}
          </p>
        </div>
        <p className="border-r border-black pr-4">
          👥 Passengers: {passengers}
        </p>
        <FaPencil
          size={18}
          color="black"
          className="cursor-pointer"
          // onClick={() => setShowSwitchTab((prev) => !prev)}
        />
      </div>
      <div className="grid grid-cols-2">
        <div className="md:col-span-1 col-span-2 p-4 overflow-scroll h-[100vh]">
          <VehicleCarousel />
        </div>
        <div className="md:col-span-1 md:block hidden">
          <MapComponent
            key={`${fromLat}-${fromLon}-${toLat}-${toLon}`}
            fromLat={fromLat}
            fromLon={fromLon}
            toLat={toLat || attractionLat}
            toLon={toLon || attractionLon}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
