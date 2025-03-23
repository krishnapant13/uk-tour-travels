import React from "react";
import Image from "next/image";

interface ImageGridProps {
  imageSrc: string | string[]; // Can be a single string or an array of strings
}

const ImageGrid: React.FC<ImageGridProps> = ({ imageSrc }) => {
  // Handle the case where imageSrc is an array of images
  if (Array.isArray(imageSrc)) {
    // If there are 3 images in the array, use the first two for the grid and the third one spanning both rows
    if (imageSrc.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {/* First Column */}
          <div className="grid gap-4">
            <div className="relative w-full h-full">
              <Image
                src={imageSrc[0]}
                height={400}
                width={400}
                alt="Image 1"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="relative w-full h-full">
              <Image
                src={imageSrc[1]}
                height={400}
                width={400}
                alt="Image 2"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Second Column: Spanning both rows with the third image */}
          <div className="row-span-2 gap-4">
            <div className="relative w-full h-full">
              <Image
                src={imageSrc[2]} // Third image
                alt="Image 3"
                height={400}
                width={400}
                objectFit="cover"
                className="rounded-lg shadow-lg mt-5"
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="relative w-full h-full">
        <Image
          src={imageSrc[0]} // Just use the first image from the array
          alt="Array Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>
    );
  } else {
    // If it's a single string (single image), show that image
    return (
      <div className="relative w-full h-[40vh] md:h-[70vh]">
        <Image
          src={imageSrc} // Single image
          alt="Single Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>
    );
  }
};

export default ImageGrid;
