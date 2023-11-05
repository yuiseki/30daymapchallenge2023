/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('/cesium'),
      })
    );
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/cesium/Build/Cesium',
            to: './static/chunks/cesium',
          },
        ],
      })
    );
    return config;
  },
};

module.exports = nextConfig;
