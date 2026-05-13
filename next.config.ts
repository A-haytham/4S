import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/الرئيسية", destination: "/", permanent: true },
      { source: "/category/:slug*", destination: "/", permanent: true },
      { source: "/tag/:slug*", destination: "/", permanent: true },
      { source: "/em_services/:slug*", destination: "/our-services", permanent: true },
      {
        source: "/software-house-company-in-egypt",
        destination: "/about",
        permanent: true,
      },
      { source: "/products", destination: "/solutions", permanent: true },
      { source: "/erp", destination: "/solutions", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/services", destination: "/our-services", permanent: true },
      { source: "/solutions/erp", destination: "/solutions", permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
