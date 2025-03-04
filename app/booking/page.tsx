import FormSection from "@/app/booking/FormSection";
import Navbar from "../components/Navbar";

export default async function ConfirmBookingPage() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full bg-white  rounded-lg mt-14 overflow-hidden">
        {/* Left Section */}
        <div className="p-16">
          <h2 className="text-md text-gray-500 font-semibold">
            You're almost here
          </h2>
          <h3 className="text-4xl font-bold mt-2">
            Confirm Your Booking details{" "}
          </h3>
          <h4 className="text-2xl font-semibold text-gray-800 mt-10">Booking Details</h4>

          {/* Client-Side Form */}
          <FormSection />
        </div>

        {/* Right Section (Black Background) */}
        <div className="hidden md:block bg-black"></div>
      </div>
    </>
  );
}
