/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: false,
    appDir: true,
    serverComponentsExternalPackages: [],
  },
  // Optimisations pour les appareils mobiles
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Gestion des polyfills
  webpack: (config, { isServer, dev }) => {
    // Assurer que les fichiers JSON sont correctement traités
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    })

    // Ignorer les erreurs liées à localStorage
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: false,
      }

      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: "string-replace-loader",
            options: {
              search: "localStorage",
              replace: '(typeof window !== "undefined" ? window.localStorage : {})',
              flags: "g",
            },
          },
        ],
      })
    }

    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  pageExtensions: ["tsx", "ts", "jsx", "js"].filter((ext) => !ext.includes("error")),
}

module.exports = nextConfig
