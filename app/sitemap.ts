import { MetadataRoute } from "next";
import citiesData from "@/app/citiesData.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://uttarakhandtravelss.com";
  const lastModified = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified },
    { url: `${baseUrl}/about`, lastModified },
    { url: `${baseUrl}/booking`, lastModified },
  ];

  // Function to format attraction URLs
  const formatUrl = (
    city: string,
    attraction: { name: string; header: string }
  ) => {
    const formattedAttraction = `${attraction.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;
    return `${baseUrl}/${city.toLowerCase()}/${formattedAttraction}`;
  };

  // Add city and attraction routes
  citiesData.forEach((city) => {
    city.attractions.forEach((attraction) => {
      routes.push({
        url: formatUrl(city.city, attraction),
        lastModified,
      });
    });
  });

  return routes;
}
