import { Metadata } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import { FaTaxi } from "react-icons/fa";
import { MdOutlineCurrencyRupee, MdSupportAgent, MdTour } from "react-icons/md";

export const metadata: Metadata = {
  title: "About Us - Uttarakhand Travels",
  description:
    "Discover our private taxi and tour services across Uttarakhand. We offer reliable and comfortable travel experiences to popular destinations.",
  keywords:
    "Uttarakhand tours, private taxi, travel services, Nainital, Rishikesh, Mussoorie",
  openGraph: {
    title: "About Us - Uttarakhand Travels",
    description:
      "Explore personalized taxi and tour services in Uttarakhand. Comfortable and reliable travel experiences to scenic destinations.",
    images: ["/logo.webp"],
    url: "https://uttarakhandtravelss.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="px-5 md:px-14 py-10 mt-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="text-lg text-gray-600 mt-4 leading-7">
            Welcome to <span className="font-bold">Uttarakhand Travels</span>,
            your trusted partner for exploring the majestic beauty of
            Uttarakhand. We specialize in providing comfortable, safe, and
            reliable taxi and tour services to popular destinations like
            <span className="font-semibold">
              {" "}
              Char dham yatra, Nainital, Jim corbett ramnagar, delhi
            </span>{" "}
            and beyond.
          </p>

          <div className="mt-8">
            <Image
              src="/logo.webp"
              alt="Taxi Tour in Uttarakhand"
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-700 mt-8">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-600 mt-4 space-y-3">
            <li>
              <FaTaxi size={20} className=" inline " color="orange" />{" "}
              <strong>Reliable Taxi Services:</strong> Comfortable and safe
              rides with experienced drivers.
            </li>
            <li>
              <MdTour size={20} className=" inline " color="orange" />{" "}
              <strong>Customized Tours:</strong> Explore scenic
              destinations at your pace.
            </li>
            <li>
              <MdSupportAgent size={20} className=" inline " color="orange" />{" "}
              <strong>24/7 Support:</strong> Friendly customer service to assist
              you anytime.
            </li>
            <li>
              <MdOutlineCurrencyRupee
                size={20}
                className=" inline "
                color="orange"
              />{" "}
              <strong>Affordable Prices:</strong> Competitive pricing with no
              hidden charges.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-700 mt-8">Our Mission</h2>
          <p className="text-lg text-gray-600 mt-4 leading-7">
            Our mission is to make your travel experience seamless and enjoyable
            by offering **safe, reliable, and comfortable** taxi services.
            Whether you are heading for a spiritual retreat in Rishikesh or
            seeking adventure in the hills of Nainital, we ensure a memorable
            journey.
          </p>

          <h2 className="text-2xl font-bold text-gray-700 mt-8">Contact Us</h2>
          <p className="text-lg text-gray-600 mt-4 leading-7">
            Have questions or need assistance? Feel free to reach out to us:
          </p>
          <ul className="mt-4 text-gray-600">
            <li>
              📞 <strong>Phone:</strong> +91-9761409770
            </li>
            <li>
              📧 <strong>Email:</strong> uttarakhandtravel4u@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
