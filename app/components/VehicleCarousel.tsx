"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  MdAcUnit,
  MdAirlineSeatReclineExtra,
  MdOutlineBatteryChargingFull,
  MdOutlineDirectionsCar,
  MdWifi,
} from "react-icons/md";
import CustomButton from "./CustomButton";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const VehicleCarousel = ({ vehicles }: { vehicles: any[] }) => {
  const iconMap: { [key: string]: JSX.Element } = {
    MdAirlineSeatReclineExtra: <MdAirlineSeatReclineExtra />,
    MdWifi: <MdWifi />,
    MdAcUnit: <MdAcUnit />,
    MdOutlineDirectionsCar: <MdOutlineDirectionsCar />,
    MdOutlineBatteryChargingFull: <MdOutlineBatteryChargingFull />,
  };

  return (
    <div className="carousel-container flex flex-col space-y-4 w-[70%] scroll-smooth">
      {vehicles.map((vehicle) => {
        const [hovered, setHovered] = useState(false);

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
              display: hovered ? "flex" : "none",
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

        // Slider Settings
        const settings = {
          dots: true,
          infinite: true,
          arrows: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 3000,
          nextArrow: <CustomArrow direction="right" />,
          prevArrow: <CustomArrow direction="left" />,
        };

        return (
          <div
            key={vehicle.id}
            className="vehicle-carousel overflow-hidden grid grid-cols-1 md:grid-cols-2 relative w-auto mx-auto border-b-[1px] border-gray-300 "
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Slider {...settings}>
              {vehicle.image.map((image: string, imageIndex: number) => (
                <Image
                  key={imageIndex}
                  src={image}
                  alt={`${vehicle.name} Image ${imageIndex + 1}`}
                  width={500}
                  height={300}
                  className="rounded-lg "
                />
              ))}
            </Slider>
            <div className="flex flex-col justify-between items-start w-full p-5 pb-10">
              <div className="flex flex-col justify-start items-start">
                <p className="font-bold text-lg">{vehicle.brand}</p>
                <p className="text-gray-600">{vehicle.name}</p>
                <p className="text-gray-600">{vehicle.type}</p>
                <p className="text-gray-600">{vehicle.seats} Seater Car</p>
                <div className="flex space-x-4 my-4">
                  {vehicle.features.map((feature: any, index: number) => (
                    <div key={index} className="relative group">
                      <span className="text-xl">{iconMap[feature.icon]}</span>
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-8 text-sm bg-blue-600 text-white p-1 rounded opacity-0 group-hover:opacity-100">
                        {feature.tooltip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p>
                  Price: <span className=" font-bold">{vehicle.price} ₹ </span>{" "}
                </p>
                {hovered && <CustomButton title="Book" />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleCarousel;
