import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "liyu-project-archive";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  output: "export",

  basePath: isGitHubActions ? `/${repoName}` : "",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;