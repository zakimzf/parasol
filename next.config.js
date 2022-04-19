/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  env: {
    NETWORK: process.env.NETWORK || "dev",
    PLATFORM_FEE_ADDRESS: process.env.PLATFORM_FEE_ADDRESS || "",
    PLATFORM_FEE_PERCENTAGE: process.env.PLATFORM_FEE_PERCENTAGE || 0,
    NEXT_PUBLIC_MINT: process.env.NEXT_PUBLIC_MINT || "",
    NEXT_PUBLIC_COLLECTION_MINT: process.env.NEXT_PUBLIC_COLLECTION_MINT || "",
    REACT_APP_FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
    HCAPTCHA_SITE_KEY: process.env.HCAPTCHA_SITE_KEY,
  },
};

module.exports = nextConfig;
