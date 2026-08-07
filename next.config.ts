import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "liyu-project-archive";
const basePath = isGitHubActions ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  output: "export",

  basePath,

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;