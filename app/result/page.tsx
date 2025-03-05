"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import VehicleCarousel from "../components/VehicleCarousel";
import { FaArrowRightLong, FaPencil } from "react-icons/fa6";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

const ResultPageContent: React.FC = () => {
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

  return (
    <div className="relative">
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
        <FaPencil size={18} color="black" className="cursor-pointer" />
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

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPageContent />
    </Suspense>
  );
}
