/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites () {
    return [
      {
        source: "/api/:path*/",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN || location.protocol + "//" + location.host}/:path*`,
      },
    ]
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK || "devnet",
    NEXT_PUBLIC_PLATFORM_FEE_ADDRESS: process.env.NEXT_PUBLIC_PLATFORM_FEE_ADDRESS || "",
    NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE: process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE || 0,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    HCAPTCHA_SITE_KEY: process.env.HCAPTCHA_SITE_KEY,
    NEXT_PUBLIC_PAYMENT_MINT: process.env.NEXT_PUBLIC_PAYMENT_MINT || "",
    NEXT_PUBLIC_COLLECTION_MINT: process.env.NEXT_PUBLIC_COLLECTION_MINT || "",
    NEXT_PUBLIC_TREASURY_MINT: process.env.NEXT_PUBLIC_TREASURY_MINT || "",
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || location.protocol + "//" + location.host,
  },
};

module.exports = nextConfig;