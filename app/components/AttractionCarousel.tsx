"use client";
import React, { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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

  // Memoize route formatting to avoid unnecessary recalculations
  const formattedRoute = useMemo(
    () =>
      `${attraction.name.toLowerCase().replace(/\s+/g, "-")}-${attraction.header
        .toLowerCase()
        .replace(/,/g, "")
        .replace(/\s+/g, "-")}`,
    [attraction.name, attraction.header]
  );

  // Memoize navigation function
  const handleNavigation = useCallback(() => {
    router.push(`/${city.toLowerCase()}/${formattedRoute}`);
  }, [router, city, formattedRoute]);

  // Move this outside the AttractionCarousel component
  const CustomArrow = ({
    onClick,
    direction,
    isHovered,
  }: {
    onClick?: () => void;
    direction: "left" | "right";
    isHovered: boolean;
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
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      nextArrow: <CustomArrow direction="right" isHovered={isHovered} />,
      prevArrow: <CustomArrow direction="left" isHovered={isHovered} />,
    }),
    [isHovered]
  );

  return (
    <div
      className="carousel-container overflow-hidden flex flex-col relative w-full md:w-[23%] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        <CustomButton title="Learn More" onClick={handleNavigation} />
      </div>
    </div>
  );
};

export default AttractionCarousel;
