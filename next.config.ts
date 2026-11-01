import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Permite revisar el sitio en desarrollo desde el celular en la red local.
  allowedDevOrigins: ["192.168.100.16"],
  // 90 para las miniaturas de celulares: con texto pequeño, 75 deja manchas
  images: { qualities: [75, 90] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
