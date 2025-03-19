/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const isProd = process.env.NODE_ENV === "production";

// Docker deployment
// To add support for Docker to an existing project,
// you can directly set the `dockerDeploymentEnabled` property to `true`
const dockerDeploymentEnabled = false;

// Static Exports
let exportHtmlEnabled = process.env.EXPORT_ENABLED == "false" ? false : true;
if (dockerDeploymentEnabled) exportHtmlEnabled = false;

//
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Use the "https://yourusername.github.io/my-subdirectory/ " in production and localhost for development.
  // !!!IMPORTANT: You need to modify the relevant paths in the "scripts/config-rootdir-of-publishing-source.js" at the same time
  /*
    basePath: isProd ? '/my-subdirectory' : undefined,
    assetPrefix: isProd ? '/my-subdirectory/' : undefined,
    */

  // disable source map
  productionBrowserSourceMaps: true,

  // !!! for docker (`output: 'standalone'`)
  // This will create a folder at .next/standalone which can then be deployed on its own without installing node_modules.

  output: dockerDeploymentEnabled ? "standalone" : undefined,

  // image optimize
  images: {
    unoptimized: true,
  },

  //  add a page route with html extension
  // Rename the file under pages directory to `.html.tsx`
  pageExtensions: ["html.jsx", "jsx", "js", "tsx", "ts"],
  // omit the html extension
  trailingSlash: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    exportHtml: `${exportHtmlEnabled}`,
  },
};

module.exports = nextConfig;
