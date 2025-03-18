import FormSection from "@/app/booking/FormSection";
import Navbar from "../components/Navbar";
import Card from "./Card";

export default async function ConfirmBookingPage() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 md:flex-row w-full bg-white rounded-lg md:mt-14 mt-20 overflow-hidden">
        <div className="order-1 md:order-2">
          <Card />
        </div>

        <div className="md:p-16 p-2 order-2 md:order-1">
          <h2 className="text-md text-gray-500 font-semibold">
            You are almost here
          </h2>
          <h3 className="md:text-4xl text-2xl font-bold mt-2">
            Confirm Your Booking details{" "}
          </h3>
          <h4 className="md:text-2xl text-xl font-semibold text-gray-800 md:mt-10">
            Booking Details
          </h4>

          <FormSection />
        </div>
      </div>
    </>
  );
}
