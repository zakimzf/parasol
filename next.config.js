/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `${
          process.env.NEXT_PUBLIC_DOMAIN ||
          location.protocol + "//" + location.host
        }/:path*`,
      },
    ];
  },
  // serverRuntimeConfig: {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // },
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
};

module.exports = nextConfig;
