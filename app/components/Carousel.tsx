"use client";
import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import citiesData from "../citiesData.json";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto overflow-hidden">
      <Slider {...settings}>
        {citiesData.map((city, index) => (
          <div key={index} className="relative px-2">
            <Image
              src={city.image}
              alt={`Slide ${index + 1}`}
              width={500}
              height={300}
              className="object-cover rounded-lg w-full h-[20em]"
            />
            <p className="absolute top-4 left-4 px-2 py-1 rounded-full bg-blue-700 text-[0.8em] text-white">
              {city.attractions.length} Tours
            </p>
            <p className="absolute bottom-4 left-4 px-2 py-1 text-md text-white flex flex-col justify-start items-start">
              From
              <span className="font-bold">{city.city}</span>
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
