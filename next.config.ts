import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Domaines d'images autorisés — liste explicite pour éviter le hotlinking et les risques XSS
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "uploadthing.com" },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "priam.design" },
    ],
  },
  // Configuration Turbopack (Next.js 16 par défaut)
  turbopack: {},
  // Transpiler les packages Three.js nécessaires
  transpilePackages: ["three"],
};

export default nextConfig;



