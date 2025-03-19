import { notFound } from "next/navigation";
import citiesData from "../citiesData.json";
import AttractionCarousel from "@/app/components/AttractionCarousel";
import Footer from "@/app/components/Footer";
import HomeData from "@/app/components/HomeData";
import WhyBook from "@/app/components/WhyBook";
import Head from "next/head";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const cityData = citiesData.find(
    (data) => data.city.toLowerCase() === city.toLowerCase()
  );

  if (!cityData) return notFound();

  const pageTitle = `${cityData.city} Travel Guide | Book Taxi & Explore Attractions`;
  const pageDescription = `Discover the best attractions and book taxis in ${cityData.city}. Enjoy a smooth journey with comfortable vehicles and top-rated services.`;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "City",
    name: cityData.city,
    description: cityData.description,
    image: cityData.images[0],
    url: `https://uttarakhandtravelss.com/${city.toLowerCase()}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `https://uttarakhandtravelss.com/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${cityData.city}, ${cityData.heading}, taxi booking, attractions, travel`}
        />
        <meta name="author" content="Uttarakhand Travelss" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={cityData.images[0]} />
        <meta
          property="og:url"
          content={`https://uttarakhandtravelss.com/${city.toLowerCase()}`}
        />
        <link
          rel="canonical"
          href={`https://uttarakhandtravelss.com/${city.toLowerCase()}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </Head>

      <main className="px-5 md:px-14">
        {/* Header Section */}
        <header>
          <HomeData
            title={cityData.city}
            description="Book your ride with a taxi, van, or bus for a smooth journey through the city, airport, or port!"
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

        {/* Why Book Section */}
        <WhyBook />

        {/* Footer Section */}
        <Footer />
      </main>
    </>
  );
}

// Generate Static Params for SEO Optimization
export async function generateStaticParams() {
  return citiesData.map((city) => ({
    city: city.city.toLowerCase(),
  }));
}
