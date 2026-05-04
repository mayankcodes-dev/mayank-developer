/** @type {import('next').NextConfig} */
const nextConfig = {
  /* React Compiler disabled — causes 404 on client components with GSAP */
  // reactCompiler: true,
  /* Turbopack: removed hardcoded path, let it auto-detect workspace root */

  images: {
    remotePatterns: [
      {
        // Hashnode CDN — cover images
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
      {
        // Hashnode media uploads
        protocol: "https",
        hostname: "**.hashnode.com",
      },
      {
        // Microlink.io — project screenshot previews (used in project-modal.tsx)
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        // jsDelivr CDN — skill logos (devicons)
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        // Coursera — certificate issuer assets (DeepLearning.AI logo)
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
      {
        // World Vector Logo — Udemy logo used in certificates
        protocol: "https",
        hostname: "cdn.worldvectorlogo.com",
      },
    ],
  },
};

export default nextConfig;
