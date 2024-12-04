import Navbar from "./components/Navbar";
import Enquiry from "./components/Enquiry";
import Carousel from "./components/Carousel";
import HomeData from "./components/HomeData";
import WhyBook from "./components/WhyBook";
import Footer from "./components/Footer";
import Feature from "./components/Feature";
export default async function Home() {
  return (
    <>
      <main className="px-6 md:px-14">
        <Navbar />
        <Enquiry />
        <HomeData
          title=" Book private transfers and tours"
          description="Explore all available options for taxis, vans and buses in
              Uttarakhand. Compare prices to book the vehicle that best suits
              your travel needs."
          imageSrc={[
            "https://i.pinimg.com/736x/1b/80/ca/1b80ca89181d5dc22029a818fbabffa4.jpg",
            "https://i.pinimg.com/736x/1b/80/ca/1b80ca89181d5dc22029a818fbabffa4.jpg",
            "https://i.pinimg.com/736x/72/56/9f/72569f6c3943b6ff7e839fdb4c4d1db1.jpg",
          ]}
        />

        <div className=" flex flex-col justify-center items-center py-10 ">
          <p className=" font-bold text-4xl text-center leading-snug md:leading-loose text-gray-800">
            Explore cities surroundings
          </p>
          <p className="text-lg text-center text-gray-600">
            Discover the heart of a city and its surrounding gems & attractions
            with our private tour packages.
          </p>
        </div>
        <Carousel />
        <WhyBook />
        <div className=" flex flex-col justify-center items-center py-10 ">
          <p className=" font-bold text-4xl text-center leading-snug md:leading-loose text-gray-800">
            Search, Book, Go
          </p>
          <p className="text-lg text-center text-gray-600">
            Find a taxi, shuttle or bus easily and go anywhere you want in
            Uttarakhand
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
