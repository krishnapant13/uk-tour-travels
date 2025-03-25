import { notFound } from "next/navigation";
import citiesData from "../citiesData.json";
import AttractionCarousel from "@/app/components/AttractionCarousel";
import Footer from "@/app/components/Footer";
import HomeData from "@/app/components/HomeData";
import WhyBook from "@/app/components/WhyBook";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: CityPageProps) {
  const { city } = await params;

  const cityData = citiesData.find(
    (data) => data.city.toLowerCase() === city.toLowerCase()
  );

  if (!cityData) {
    return {
      title: "City Not Found | Uttarakhand Travels",
      description: "The city you are looking for does not exist.",
    };
  }

  const pageTitle = `${cityData.city} Travel Guide | Taxi Booking & Local Tours`;
  const pageDescription = `Explore ${cityData.city} with top-rated taxi services, local tours, and must-see attractions. Book comfortable and affordable rides now for a hassle-free experience.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `taxi in ${cityData.city}`,
      `book cab in ${cityData.city}`,
      `private transfers ${cityData.city}`,
      `tourist attractions in ${cityData.city}`,
      `local tours ${cityData.city}`,
      `explore ${cityData.city}`,
      `Uttarakhand travel guide`,
      `taxi services ${cityData.city}`,
      `best sightseeing ${cityData.city}`,
      `car rental ${cityData.city}`,
      `local cab booking ${cityData.city}`,
      `top destinations in ${cityData.city}`,
      `affordable travel in ${cityData.city}`,
      `comfortable taxi rides ${cityData.city}`,
      `private tours in ${cityData.city}`,
    ],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://uttarakhandtravelss.com/${city.toLowerCase()}`,
      siteName: "Uttarakhand Travelss",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: cityData.images[0],
          width: 1200,
          height: 630,
          alt: `${cityData.city} Attractions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [cityData.images[0]],
      site: "@UttarakhandTravelss",
    },
    alternates: {
      canonical: `https://uttarakhandtravelss.com/${city.toLowerCase()}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;

  const cityData = citiesData.find(
    (data) => data.city.toLowerCase() === city.toLowerCase()
  );

  if (!cityData) return notFound();

  return (
    <main className="px-5 md:px-14">
      {/* Header Section */}
      <header>
        <HomeData
          title={cityData.city}
          description={`Explore the best taxis, attractions, and hidden gems in ${cityData.city}. Book your ride today!`}
          imageSrc={cityData.images[0]}
        />
      </header>

      {/* City Info Section */}
      <section className="flex flex-col justify-center items-center py-10">
        <h1 className="font-bold text-4xl text-center text-gray-800">
          {cityData.heading}
        </h1>
        <p className="text-lg text-center text-gray-600">
          {cityData.description}
        </p>
      </section>

      {/* Attractions Section */}
      <section
        className="flex flex-wrap gap-6 justify-start w-full"
        aria-label={`${cityData.city} Attractions`}
      >
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
