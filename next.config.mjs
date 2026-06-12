/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },

  // Important for react-native-web-maps
  transpilePackages: ['react-native-maps', '@teovilla/react-native-web-maps', 'react-native-web'],

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native-maps$': '@teovilla/react-native-web-maps',
      'react-native': 'react-native-web',
    };

    // Optional: Suppress warnings
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },

  // Extra settings that help with native libraries
  experimental: {
    esmExternals: false,
  },
};

export default nextConfig;