/** @type {import('next').NextConfig} */
const nextConfig = {
  
}


module.exports = {
  reactStrictMode: true,
  // env 내용 추가
  env: {
    BASE_URL: process.env.KAKAOMAP_KEY,
  },
};

module.exports = nextConfig
