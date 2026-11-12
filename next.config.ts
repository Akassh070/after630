import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework/version in every response.
  poweredByHeader: false,
  images: {
    // Every photo (not the logo/favicon) is hosted on Cloudinary and
    // delivered through this custom loader instead of Next's own Image
    // Optimization API. See src/lib/cloudinary-loader.ts.
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
  },
  // Baseline security headers for every route. No Content-Security-Policy:
  // Next.js injects inline scripts, so a CSP needs nonces and per-host tuning
  // (Cloudinary, wa.me) — worth doing deliberately later, not guessed here.
  // HSTS is left to the hosting/HTTPS layer.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
