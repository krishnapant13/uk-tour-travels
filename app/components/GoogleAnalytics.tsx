"use client";
import { GoogleAnalytics } from "nextjs-google-analytics";

const GoogleAnalyticsComponent = () => {
  return <GoogleAnalytics trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GA_ID} />;
};

export default GoogleAnalyticsComponent;
