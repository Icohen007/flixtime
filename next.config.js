/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  agentRules: false,
};

module.exports = nextConfig;
