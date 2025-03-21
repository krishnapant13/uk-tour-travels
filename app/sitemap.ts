import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://uttarakhandtravelss.com";

  const routes = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString() },
  ];

  // Dynamically add city and attraction pages
  const cities = ["nainital", "rishikesh"];
  const attractions = ["naina-devi-temple", "ram-jhula"];

  cities.forEach((city) => {
    attractions.forEach((attraction) => {
      routes.push({
        url: `${baseUrl}/${city}/${attraction}`,
        lastModified: new Date().toISOString(),
      });
    });
  });

  return routes;
}
