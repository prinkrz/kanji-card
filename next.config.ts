import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: { styledComponents: true },
  turbopack: {
    resolveAlias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
};

export default nextConfig;
