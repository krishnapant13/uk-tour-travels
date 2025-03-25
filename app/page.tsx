import { Metadata } from "next";
import Carousel from "./components/Carousel";
import HomeData from "./components/HomeData";
import WhyBook from "./components/WhyBook";
import Footer from "./components/Footer";
import Feature from "./components/Feature";

export const metadata: Metadata = {
  title: "Book Private Transfers & Tours | Uttarakhand Travel",
  description:
    "Find the best private taxi, shuttle, and bus services in Uttarakhand. Compare prices and book your ride easily!",
  keywords: [
    "Uttarakhand taxi",
    "private transfers Uttarakhand",
    "Uttarakhand tour booking",
    "cab service Uttarakhand",
    "char dham taxi",
    "char dham booking",
    "delhi to uttarkhand taxi",
  ],
  openGraph: {
    title: "Book Private Transfers & Tours | Uttarakhand Travel",
    description:
      "Find the best private taxi, shuttle, and bus services in Uttarakhand. Compare prices and book your ride easily!",
    url: "https://uttarakhandtravelss.com",
    siteName: "Uttarakhand Travel",
    images: [
      {
        url: "https://i.pinimg.com/736x/1b/80/ca/1b80ca89181d5dc22029a818fbabffa4.jpg",
        width: 1200,
        height: 630,
        alt: "Private Transfers in Uttarakhand",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@uttarakhandtravelss",
    title: "Book Private Transfers & Tours | Uttarakhand Travel",
    description:
      "Find the best private taxi, shuttle, and bus services in Uttarakhand. Compare prices and book your ride easily!",
    images: [
      "https://i.pinimg.com/736x/1b/80/ca/1b80ca89181d5dc22029a818fbabffa4.jpg",
    ],
  },
};

export default async function Home() {
  return (
    <>
      <main className="px-6 md:px-14">
        <HomeData
          title="Uttarakhand Taxi & Travel Services | Book Now"
          description="Explore all available options for taxis, vans, and buses in Uttarakhand. Compare prices to book the best vehicle for your travel needs."
          imageSrc={[
            "https://i.pinimg.com/736x/65/4a/0f/654a0f64c749df2fd3d50f55c1ab7f0d.jpg",
            "https://i.pinimg.com/736x/bf/a3/58/bfa358a8143a174fcd6b0add6e5c7611.jpg",
            "https://i.pinimg.com/736x/dd/5a/a8/dd5aa8dbf3ea9eebb50320f7d5a68975.jpg",
          ]}
        />
        <div className="flex flex-col justify-center items-center py-10">
          <h2 className="font-bold text-4xl text-center leading-snug md:leading-loose text-gray-800">
            Explore Cities & Surroundings
          </h2>
          <p className="text-lg text-center text-gray-600">
            Discover the beauty of Uttarakhand with our private tour packages,
            covering top attractions and hidden gems.
          </p>
        </div>
        <Carousel />
        <WhyBook />
        <div className="flex flex-col justify-center items-center py-10">
          <h2 className="font-bold text-4xl text-center leading-snug md:leading-loose text-gray-800">
            Search, Book, Go
          </h2>
          <p className="text-lg text-center text-gray-600">
            Find a taxi, shuttle, or bus easily and explore Uttarakhand
            hassle-free.
          </p>
        </div>
        <Feature />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
