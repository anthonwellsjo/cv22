/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['three'])
module.exports = {
  ...withTM(),
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
}
