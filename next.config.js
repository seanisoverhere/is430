/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["antd-mobile"]);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = withTM(nextConfig);
