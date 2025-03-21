import citiesData from "@/app/citiesData.json";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://uttarakhandtravelss.com";

  const staticPages = ["", "about", "contact", "terms", "privacy-policy"];

  const dynamicPages = citiesData.flatMap((city) =>
    city.attractions.map((attr) => ({
      loc: `${baseUrl}/${city.city.toLowerCase()}/${attr.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-${attr.header
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`,
      lastmod: new Date().toISOString(),
    }))
  );

  const pages = [
    ...staticPages.map((page) => ({
      loc: `${baseUrl}/${page}`,
      lastmod: new Date().toISOString(),
    })),
    ...dynamicPages,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${page.loc}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join("\n")}
</urlset>`;

  // Return XML response with correct content type
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
