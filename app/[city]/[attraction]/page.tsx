"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import citiesData from "@/app/citiesData.json";
import WhyBook from "@/app/components/WhyBook";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function AttractionPage() {
  const params = useParams();
  const city = params.city as string;
  const attraction = params.attraction as string;

  if (!city || !attraction) return notFound();

  const cityData = citiesData.find(
    (data) => data.city.toLowerCase() === city.toLowerCase()
  );

  if (!cityData) return notFound();

  const attractionData = cityData.attractions.find((attr) => {
    const formattedAttraction = `${attr.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-${attr.header
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;
    return formattedAttraction === attraction.toLowerCase();
  });

  if (!attractionData) return notFound();
  return (
    <div className="px-5 md:px-14 relative ease-linear duration-300">
      <Navbar />
      <div className="flex flex-col items-start py-20">
        <h1 className="font-bold text-4xl text-center leading-snug text-gray-800">
          {attractionData.name}
        </h1>
        <p className="text-lg text-center text-gray-600">
          {attractionData.header}
        </p>
      </div>

      <div className="w-full">
        <Image
          src={attractionData.images[0]}
          alt={attractionData.name}
          className="w-full h-96 object-cover rounded-lg"
          width={250}
          height={150}
          priority
        />

        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mt-2">Description</h2>
            <p className="py-5 text-gray-700">{attractionData.description}</p>

            <h2 className="text-2xl font-bold mt-2">Recommended Stops</h2>
            <p>
              You can visit all the places from the list or pick only the ones
              you like. Just inform your driver about your choice during the
              ride.
            </p>

            <div className="flex flex-wrap gap-4 mt-5">
              {attractionData.stops.map((stop, index) => (
                <div
                  key={index}
                  className="w-[250px] flex-shrink-0 flex flex-col items-center overflow-hidden"
                >
                  <Image
                    src={stop.image}
                    alt={`Stop ${index + 1}: ${stop.name}`}
                    width={250}
                    height={150}
                    className="rounded-2xl"
                    priority
                  />
                  <div className="bg-gray-100 text-start p-2 w-full">
                    <p className="text-base font-bold text-gray-800">
                      Stop {index + 1}: {stop.name}
                    </p>
                    <p className="text-xs text-gray-600">{stop.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-start items-start py-10">
              <h2 className="text-2xl font-bold mt-2">Price Analysis</h2>
              <p className="py-4 font-bold text-base text-gray-500">Included</p>
              <div className="flex justify-start items-center text-gray-500 mb-4">
                <FaCircleCheck className="mr-3" />
                All taxes and handling charges, Custom pick-up and drop-off
                location, Fuel and tolls
              </div>
              <p className="py-4 font-bold text-base text-gray-500">
                Not Included
              </p>
              <div className="flex justify-start items-center text-gray-500">
                <RxCrossCircled className="mr-3" />
                Entrance fees for all attractions, Tips and gratuities, Meals
                and beverages
              </div>
            </div>
          </div>

          <div className="mt-[15em]"></div>
        </div>
      </div>

      <WhyBook />
      <Footer/>
    </div>
  );
}
