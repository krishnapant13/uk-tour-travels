import Image from "next/image";
import React from "react";
import featureData from "../FeatureData.json";

interface Feature {
  title: string;
  subtitle: string;
  image: string;
}

const Feature: React.FC = () => {
  return (
    <div className="space-y-10">
      {featureData.map((feature: Feature, index: number) => (
        <div
          key={`feature_${index}`}
          className={`grid grid-cols-1 md:grid-cols-2  items-center `}
        >
          <div
            className={`flex flex-col py-1  md:py-10   ${
              index % 2 !== 0 ? "md:order-last  " : " "
            }`}
          >
            <p
              className={`font-bold text-3xl md:text-left text-center leading-snug text-gray-800  w-full ${
                index % 2 !== 0 ? "md:pl-40" : "md:pr-40"
              }`}
            >
              {feature.title}
            </p>
            <p
              className={`text-lg text-center md:text-left text-gray-600 w-full ${
                index % 2 !== 0 ? " md:pl-40" : " md:pr-40"
              } `}
            >
              {feature.subtitle}
            </p>
          </div>
          <Image
            src={feature.image}
            width={500}
            height={500}
            alt={feature.title}
            className="object-cover w-full h-[40vh] md:h-[60vh] rounded-lg  order-first md:order-none"
          />
        </div>
      ))}
    </div>
  );
};

export default Feature;
