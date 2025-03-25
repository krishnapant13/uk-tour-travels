import FormSection from "@/app/booking/FormSection";
import Card from "./Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Your Booking | Uttarakhand Travelss",
  description:
    "Review and confirm your taxi booking details with Uttarakhand Travelss. Enjoy a hassle-free and comfortable journey.",
  keywords: [
    "taxi booking",
    "confirm booking",
    "Uttarakhand taxi service",
    "safe travel",
    "car rental Uttarakhand",
    "tourist travel confirmation",
  ],
  openGraph: {
    title: "Confirm Your Booking | Uttarakhand Travelss",
    description:
      "Finalize your taxi booking with ease. Review your trip details and enjoy a comfortable ride.",
    url: "https://uttarakhandtravelss.com/booking",
    siteName: "Uttarakhand Travelss",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://uttarakhandtravelss.com/og-booking.jpg",
        width: 1200,
        height: 630,
        alt: "Confirm Booking Page - Uttarakhand Travelss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Confirm Your Booking | Uttarakhand Travelss",
    description:
      "Finalize your taxi booking with ease. Review your trip details and enjoy a comfortable ride.",
    images: ["https://uttarakhandtravelss.com/twitter-booking.jpg"],
  },
  alternates: {
    canonical: "https://uttarakhandtravelss.com/booking",
  },
};

export default async function ConfirmBookingPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:flex-row w-full bg-white rounded-lg md:mt-14 mt-20 overflow-hidden">
      <div className="order-1 md:order-2">
        <Card />
      </div>

      <div className="md:p-16 p-2 order-2 md:order-1">
        <h2 className="text-md text-gray-500 font-semibold">
          You are almost here
        </h2>
        <h3 className="md:text-4xl text-2xl font-bold mt-2">
          Confirm Your Booking Details
        </h3>
        <h4 className="md:text-2xl text-xl font-semibold text-gray-800 md:mt-10">
          Booking Details
        </h4>

        <FormSection />
      </div>
    </div>
  );
}
