import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки при сборке
  },
  eslint: {
    ignoreDuringBuilds: true, // Игнорировать ESLint
  },
};

export default nextConfig;
