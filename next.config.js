/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites () {
    return [
      {
        source: "/api/:path*/",
        destination: `${process.env.NEXT_PUBLIC_DOMAIN ||
          location.protocol + "//" + location.host
          }/:path*`
      }
    ]
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    })
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  }
}

module.exports = nextConfig
