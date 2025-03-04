"use client";
import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  MdAcUnit,
  MdAirlineSeatReclineExtra,
  MdLocalGasStation,
  MdOutlineBatteryChargingFull,
  MdOutlineDirectionsCar,
  MdSecurity,
  MdTerrain,
  MdWifi,
} from "react-icons/md";
import CustomButton from "./CustomButton";
import { useRouter, useSearchParams } from "next/navigation";
import { vehicles } from "./vehicles";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const iconMap = {
  MdAirlineSeatReclineExtra: <MdAirlineSeatReclineExtra />,
  MdWifi: <MdWifi />,
  MdAcUnit: <MdAcUnit />,
  MdOutlineDirectionsCar: <MdOutlineDirectionsCar />,
  MdOutlineBatteryChargingFull: <MdOutlineBatteryChargingFull />,
  MdSecurity: <MdSecurity />,
  MdLocalGasStation: <MdLocalGasStation />,
  MdTerrain: <MdTerrain />,
};

const VehicleCarousel = () => {
  const router = useRouter();
  const handleBooking = (vehicleId: string) => {
    router.push(`/booking${vehicleId}`);
  };
  // Custom Arrow Component
  const CustomArrow = ({
    onClick,
    direction,
  }: {
    onClick?: () => void;
    direction: "left" | "right";
  }) => (
    <div
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 cursor-pointer text-white ${
        direction === "left" ? "left-2" : "right-2"
      }`}
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(150, 150, 150, 1)",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        zIndex: 10,
      }}
    >
      {direction === "left" ? (
        <FaAngleLeft size={15} />
      ) : (
        <FaAngleRight size={15} />
      )}
    </div>
  );

  const searchParams = useSearchParams();
  const passengers = parseInt(searchParams.get("passengers") || "0", 10);
  console.log(passengers);
  const sortedVehicles = [...vehicles]
    .filter((v) => v.seats - 1 >= passengers)
    .sort((a, b) => a.seats - 1 - (b.seats - 1))
    .concat(
      [...vehicles]
        .filter((v) => v.seats - 1 < passengers)
        .sort((a, b) => b.seats - 1 - (a.seats - 1))
    );

  return (
    <div className="carousel-container flex flex-col space-y-4 w-full scroll-smooth">
      {sortedVehicles.map((vehicle) => {
        // Slider Settings
        const settings = {
          dots: true,
          infinite: true,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          nextArrow: <CustomArrow direction="right" />,
          prevArrow: <CustomArrow direction="left" />,
        };

        return (
          <div
            key={vehicle.id}
            className="vehicle-carousel overflow-hidden grid grid-cols-1 md:grid-cols-2 relative w-auto mx-auto border-b-[1px] border-gray-300"
          >
            <Slider {...settings}>
              {vehicle.image.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="relative w-full overflow-hidden"
                  style={{ width: "100%", height: "auto" }}
                >
                  <div className="relative w-full h-[200px] ">
                    <Image
                      src={image}
                      alt={`${vehicle.name} Image ${imageIndex + 1}`}
                      fill
                      className="rounded-lg object-cover bg-no-repeat"
                      priority
                    />
                  </div>
                </div>
              ))}
            </Slider>

            <div className="flex flex-col justify-between items-start w-full p-5 pb-10">
              <div className="flex flex-col justify-start items-start">
                <p className="font-bold text-lg">{vehicle.brand}</p>
                <p className="text-gray-600">{vehicle.name}</p>
                <p className="text-gray-600">{vehicle.type}</p>
                <p className="text-gray-600">
                  {vehicle.seats - 1 + " + " + 1} Seater Car
                </p>
                <div className="flex space-x-4 my-4">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="relative group">
                      <span className="text-xl">
                        {iconMap[feature.icon as keyof typeof iconMap]}
                      </span>
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-8 text-sm bg-blue-600 text-white p-1 rounded opacity-0 group-hover:opacity-100">
                        {feature.tooltip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p>
                  Price:{" "}
                  <span className=" font-bold">{vehicle.price}₹ / day</span>
                </p>
                <CustomButton
                  title="Book Now"
                  sx={{ width: "40%", padding: "2px" }}
                  onClick={() => handleBooking(vehicle.id)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleCarousel;
