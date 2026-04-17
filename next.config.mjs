const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ✅ skips lint errors on build
  },
  typescript: {
    ignoreBuildErrors: true,   // ✅ skips TS errors on build
  },
};

export default nextConfig;