/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader',
		});
		if (!isServer) {
			config.resolve.fallback.fs = false;
		}
		return config;
	},
	env: {
		NETWORK: process.env.NETWORK || "dev",
		PLATFORM_FEE_ADDRESS: process.env.PLATFORM_FEE_ADDRESS || "",
	}
}

module.exports = nextConfig
