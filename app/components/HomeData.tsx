import { FaRegCreditCard } from "react-icons/fa";
import { IoIosTimer, IoMdCheckmarkCircleOutline } from "react-icons/io";
import ImageGrid from "./ImageGrid";
import SwitchTab from "./SwitchTab";
import Enquiry from "./Enquiry";
import Head from "next/head";
import SlidingPanelClient from "./SlidingPanelClient";

interface HomeComponentProps {
  title: string;
  description: string;
  imageSrc: string | string[];
}

const HomeData = async ({
  title,
  description,
  imageSrc,
}: HomeComponentProps) => {
  return (
    <>
      <Head>
        <title>{`${title} | Uttarakhand Taxi & Tour Services`}</title>
        <meta
          name="description"
          content={`${description} - Book your taxi or tour service with us for a safe, reliable, and comfortable experience in Uttarakhand.`}
        />
        <meta
          name="keywords"
          content="Uttarakhand taxi booking, tour services, safe travel, real-time confirmation, easy payment"
        />
        <meta name="author" content="Uttarakhand Travels" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://uttarakhandtravelss.com" />
      </Head>

      <main className="relative">
        <section className="grid grid-cols-1 md:grid-cols-2 h-full gap-4 py-5 mt-16 mb-4">
          <div className="flex flex-col justify-between md:justify-start items-start h-full md:space-y-4 space-y-10">
            {/* Enquiry Form */}
            <Enquiry />

            <h1 className="text-[2em] md:text-5xl font-bold text-gray-800 leading-snug">
              {title}
            </h1>

            <p className="text-gray-600 text-lg md:text-xl leading-snug">
              {description}
            </p>

            {/* Client-side sliding panel */}
            <SlidingPanelClient />
          </div>

          <ImageGrid imageSrc={imageSrc} />
        </section>

        <SwitchTab
          showCapsuleTabs={true}
          absolutePosition={{
            bottom: "35%",
            left: "0",
            transform: "translateX(0)",
          }}
        />

        <section
          className="hidden md:flex flex-col md:flex-row justify-center items-center w-full mt-10 ml-8 md:ml-auto pb-20 border-b border-gray-300"
          aria-label="Key Features"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full">
            <div
              className="flex flex-col items-center text-center md:w-1/3"
              aria-label="Checked Vehicles"
            >
              <IoMdCheckmarkCircleOutline
                className="mb-2"
                color="blue"
                size={35}
                aria-hidden="true"
              />
              <p className="text-lg font-medium">Checked Only Vehicles</p>
            </div>

            <div
              className="flex flex-col items-center text-center md:w-1/3"
              aria-label="Real-time Confirmation"
            >
              <IoIosTimer
                className="mb-2"
                color="blue"
                size={35}
                aria-hidden="true"
              />
              <p className="text-lg font-medium">Real-Time Confirmation</p>
            </div>

            <div
              className="flex flex-col items-center text-center md:w-1/3"
              aria-label="Safe Payments"
            >
              <FaRegCreditCard
                className="mb-2"
                color="blue"
                size={35}
                aria-hidden="true"
              />
              <p className="text-lg font-medium">Safe Payments</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomeData;
