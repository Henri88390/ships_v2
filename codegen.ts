import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://spacex-production.up.railway.app/": {
        headers: {
          "x-hasura-admin-secret": "nhost-admin-secret",
        },
      },
    },
  ],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      documents: ["src/**/*.tsx"],
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
