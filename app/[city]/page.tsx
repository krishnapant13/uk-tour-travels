import { notFound } from "next/navigation";
import citiesData from "../citiesData.json";
import AttractionCarousel from "@/app/components/AttractionCarousel";
import Footer from "@/app/components/Footer";
import HomeData from "@/app/components/HomeData";
import WhyBook from "@/app/components/WhyBook";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const cityData = citiesData.find(
    (data) => data.city.toLowerCase() === city.toLowerCase()
  );

  if (!cityData) return notFound();

  return (
    <main className="px-5 md:px-14">
      <HomeData
        title={cityData.city}
        description="Book your ride with a taxi, van, or bus for a smooth journey through the city, airport, or port!"
        imageSrc={cityData.images[0]}
      />
      <section className="flex flex-col justify-center items-center py-10">
        <h2 className="font-bold text-4xl text-center text-gray-800">
          {cityData.heading}
        </h2>
        <p className="text-lg text-center text-gray-600">
          {cityData.description}
        </p>
      </section>

      <section className="flex flex-wrap gap-6 justify-start w-full">
        {cityData.attractions.map((attraction, index) => (
          <AttractionCarousel
            key={index}
            layout="column"
            attraction={attraction}
            city={city}
          />
        ))}
      </section>

      <WhyBook />
      <Footer />
    </main>
  );
}

export async function generateStaticParams() {
  return citiesData.map((city) => ({
    city: city.city.toLowerCase(),
  }));
}
