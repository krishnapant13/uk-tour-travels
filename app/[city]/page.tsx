import citiesData from "../citiesData.json";
import AttractionCarousel from "../components/AttractionCarousel";
import Footer from "../components/Footer";
import HomeData from "../components/HomeData";
import WhyBook from "../components/WhyBook";

const CityPage = async ({ params }: { params: { city: string } }) => {
  const { city } = await params;

  const cityData = citiesData.find(
    (data) => data.city.toLowerCase() === city.toLowerCase()
  );
  if (!cityData) {
    return (
      <div>
        <h1>City Not Found</h1>
        <p>The city "{city}" does not exist in our database.</p>
      </div>
    );
  }
  return (
    <>
      <div className="px-5 md:px-14">
        <HomeData
          title={cityData.city}
          description="Book your ride with a taxi, van or bus for a smooth journey through the city, airport, or port!"
          imageSrc={cityData.images[0]}
        />
        <div className=" flex flex-col justify-center items-center py-10 ">
          <p className=" font-bold text-4xl text-center leading-snug md:leading-loose text-gray-800">
            {cityData.heading}
          </p>
          <p className="text-lg text-center text-gray-600">
            {cityData.description}
          </p>
        </div>
        {/* Attraction Carousels */}
        <div className="attractions-section flex flex-wrap gap-6 justify-start w-full">
          {cityData.attractions.map((attraction, index) => (
            <AttractionCarousel
              layout="column"
              key={index}
              attraction={attraction}
              city={city}
            />
          ))}
        </div>
      </div>{" "}
      <WhyBook />
      <Footer />
    </>
  );
};

export default CityPage;
