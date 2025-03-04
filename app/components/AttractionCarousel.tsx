"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import CustomButton from "./CustomButton";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface Attraction {
  name: string;
  header: string;
  images: string[];
  recommended_stops: string[];
}

const AttractionCarousel = ({
  attraction,
  city,
}: {
  attraction: Attraction;
  city: string;
  layout: "row" | "column";
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Format the route for the attraction
  const formattedRoute = `${attraction.name
    .toLowerCase()
    .split(" ")
    .join("-")}-${attraction.header
    .toLowerCase()
    .replace(/,/g, "")
    .split(" ")
    .join("-")}`;

  const handleNavigation = () => {
    router.push(`/${city.toLowerCase()}/${formattedRoute}`);
  };

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
        display: isHovered ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(150, 150, 150, 1)",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        zIndex: 10,
      }}
    >
      <p className="text-xs font-bold">
        {direction === "left" ? (
          <FaAngleLeft size={15} />
        ) : (
          <FaAngleRight size={15} />
        )}
      </p>
    </div>
  );

  const settings = {
    dots: false,
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
      className="carousel-container overflow-hidden flex flex-col relative w-full md:w-[23%] cursor-pointer "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <Slider {...settings}>
          {attraction.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${attraction.name} - ${index + 1}`}
              width={500}
              height={300}
              className="rounded-2xl md:h-[13em] sm:h-auto bg-cover"
              loading="lazy"
              quality={75}
              onClick={handleNavigation}
              style={{
                objectFit: "fill",
                borderRadius: "8px",
                height: "20em",
                width: "95%",
              }}
            />
          ))}
        </Slider>
        <h3 className="text-base font-bold pt-4 text-gray-800">
          {attraction.name}: {attraction.header}
        </h3>
        <h5 className="text-sm text-gray-600"></h5>
        <div className="flex justify-start items-center mt-1">
          {attraction.recommended_stops.map((stop, index) => (
            <div
              key={index}
              className="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded-md mx-1"
            >
              {stop}
            </div>
          ))}
        </div>
        <div
          className={`flex ${
            isHovered ? "justify-between" : "md:justify-start"
          } items-center mt-4`}
        >
          <CustomButton
            title="Learn More"
            onClick={handleNavigation}
            sx={{ display: { xs: "block", md: "none" }, width: "50%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AttractionCarousel;
