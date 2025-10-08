import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    turbo: {
      resolveAlias: {
        // Stub out graphql imports that dd-trace's graphql plugin uses
        // We don't need these since we're not using the graphql plugin
        'graphql/language/visitor': './lib/stubs/graphql-stub.js',
        'graphql/language/printer': './lib/stubs/graphql-stub.js',
        'graphql/utilities': './lib/stubs/graphql-stub.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
    ],
  },
  serverExternalPackages: ["ai"],
};

export default nextConfig;
