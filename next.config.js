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
	}
}

module.exports = nextConfig
