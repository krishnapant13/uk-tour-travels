import Image from "next/image";
import React from "react";

const WhyBook = () => {
  const images = [
    {
      src: "https://i.pinimg.com/736x/b1/f5/c3/b1f5c3b8277e7ea5f4d9cb61e94864a6.jpg",
      size: 70,
      top: 20,
      left: 20,
    },
    {
      src: "https://i.pinimg.com/736x/80/75/85/807585a7b821e516ce8ba15fe6286687.jpg",
      size: 50,
      top: "50%",
      left: -20,
    },
    {
      src: "https://i.pinimg.com/736x/6a/d6/0d/6ad60db79e97190a53bb80e085552d1f.jpg",
      size: 50,
      top: "50%",
      right: -20,
    },
    {
      src: "https://i.pinimg.com/736x/49/d0/4a/49d04a0cb402fafdae932507121f7002.jpg",
      size: 50,
      bottom: -20,
      right: "40%",
    },
    {
      src: "https://i.pinimg.com/736x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
      size: 70,
      bottom: 20,
      left: 20,
    },
    {
      src: "https://i.pinimg.com/736x/1d/75/19/1d75195e277fae343bdb8577c26a6835.jpg",
      size: 70,
      bottom: 20,
      right: 20,
    },
    {
      src: "https://i.pinimg.com/736x/f0/5a/3f/f05a3f01fb4e103964dffe02dc84ae70.jpg",
      size: 70,
      top: 20,
      right: 20,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full h-[70vh] pb-10 my-10 bg-gradient-to-b from-gray-300  to-gray-100">
      <div className="w-full h-full p-4 md:p-28 justify-center  md:justify-start items-center">
        <h2 className="text-4xl font-bold leading-loose md:text-left text-center ">Why book with us?</h2>
        <h4 className="text-2xl font-bold text-blue-600 md:text-left text-center">
          We are a fully licensed transfer booking platform
        </h4>
        <h1 className="text-gray-500 mt-2 md:text-left text-center">
          At UTT, you can find a variety of verified vehicles from numerous
          different providers. You can compare prices and amenities, and book
          the vehicle that best suits your travel needs.
        </h1>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="md:h-96 h-full md:w-96 w-72 border border-dashed border-blue-600 flex justify-center items-center rounded-full relative border-s-0 border-e-0">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              width={image.size}
              height={image.size}
              alt={`Travelling person ${index + 1}`}
              className="absolute object-cover rounded-full"
              style={{
                top: image.top,
                left: image.left,
                bottom: image.bottom,
                right: image.right,
                width: `${image.size + "px"}`,
                height: `${image.size + "px"}`,
              }}
            />
          ))}
          <div className="md:h-52 h-40 md:w-52 w-40 border-collapse border border-dashed border-blue-600 border-b-0 border-t-0 rounded-full  flex justify-center items-center">
            <Image
              src="/yum.png"
              width={100}
              height={100}
              alt="logo"
              className=" object-cover rounded-full m-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyBook;
