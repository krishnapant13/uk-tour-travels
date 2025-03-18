"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Vehicle {
  image: string;
  brand: string;
  name: string;
  seats: number;
  price: number;
}

interface SearchData {
  transport: string;
  days?: number;
  fromData: string;
  toData: string;
  departureTime?: string;
  passengers: number;
  vehicle?: Vehicle;
}

const Card = () => {
  const [data, setData] = useState<SearchData | null>(null);

  useEffect(() => {
    const searchData = localStorage.getItem("searchData");

    if (searchData) {
      try {
        const parsedData: SearchData = JSON.parse(searchData);
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing searchData:", error);
      }
    }
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const formattedDateTime = data.departureTime
    ? new Date(data.departureTime).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "N/A";

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="md:w-[60%] w-[90%] md:h-[80%] h-[50vh] bg-white shadow-lg rounded-t-2xl rounded-b-lg overflow-hidden">
        {/* Vehicle Image Section */}
        <div className="relative w-full h-1/2">
          <Image
            src={data.vehicle?.image || "/images/placeholder.jpg"}
            alt={data.vehicle?.brand || "Vehicle Image"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute left-[1em] bottom-[-2.5em] w-[7em] h-[5em] rounded-md border-4 border-white shadow-lg">
            <Image
              src={data.vehicle?.image || "/images/placeholder.jpg"}
              alt={data.vehicle?.brand || "Vehicle Image"}
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>
        </div>
        <div className="p-5 pt-10 h-1/2 flex flex-col justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Uttarakhand Tour and Travels
          </h2>
          <h2 className="text-xl font-bold text-orange-400 capitalize">
            {data.transport}
            {": "}
            {data.transport === "tour" ? `${data.days} day's` : ""}
          </h2>
          <div className="text-gray-600 space-y-2">
            <p>
              <span>
                {data.fromData} - {data.toData} {" • "}
              </span>
              <span>
                {formattedDateTime} {" • "}
              </span>
              <span>
                {data.passengers} passengers {" • "}
              </span>
              <span>
                {data.vehicle?.seats} Seater {data.vehicle?.name}
              </span>
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center border-t pt-3">
            <p className="text-lg font-semibold text-gray-800">TOTAL</p>
            <p className="text-lg font-bold text-blue-600">
              ₹{data.vehicle?.price || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
