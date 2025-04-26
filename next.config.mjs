const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["www.cryptocompare.com", "lh3.googleusercontent.com"], // Add allowed domains here
  },
};

export default nextConfig;
