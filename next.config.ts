import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "placehold.co",
      "thevirtualinstructor.com",
      "your-cdn.com",
      "img.freepik.com",
      "img.youtube.com",
      "i.ytimg.com",
      "www.youtube.com",
      "youtu.be",
      "youtube-nocookie.com",
      "youtube.googleapis.com",
      "youtube.gstatic.com",
      "cdn.jsdelivr.net",
      "cdn.plyr.io",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
