import { MetadataRoute } from "next";
import citiesData from "@/app/citiesData.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://uttarakhandtravelss.com";

  // Static Pages
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
  ];

  // Dynamically Add City and Attraction Pages
  citiesData.forEach((city) => {
    city.attractions.forEach((attraction) => {
      const formattedAttraction = `${attraction.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`;

      routes.push({
        url: `${baseUrl}/${city.city.toLowerCase()}/${formattedAttraction}`,
        lastModified: new Date().toISOString(),
      });
    });
  });

  return routes;
}
