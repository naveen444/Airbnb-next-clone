import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "a0.muscache.com",
				protocol: 'https',
				port: ""
			},
			{
        protocol: "https",
        hostname: "vtilkrpezfgpguifkvrk.supabase.co", // ✅ Allow Supabase Storage
        pathname: "/storage/v1/object/public/images/**", // ✅ Allow all images inside `/public/images/`
      },
		]
	},
};

export default nextConfig;
