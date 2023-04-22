import { buildConfig } from "payload/config";
import path from "path";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

import Categories from "./collections/Categories";
import Products from "./collections/Products";
import Users from "./collections/Users";
import Media from "./collections/Media";
import { Sites } from "./collections/Sites";
import Companies from "./collections/Company";
import { seed } from "./seed";
import Orders from "./collections/Orders/index";
import ShippingOptions from "./collections/ShippingOptions";
import PaymentMethods from "./collections/PaymentMethods";
import Configurations from "./collections/Configurations";
import nestedDocs from "@payloadcms/plugin-nested-docs";

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  },
  bucket: process.env.S3_BUCKET,
});

export default buildConfig({
  serverURL: process.env.HOST_NAME,
  cors: "*",
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: adapter,
          disableLocalStorage: true,
          prefix: "media/images",
        },
      },
    }),
    nestedDocs({
      collections: ["categories"],
    }),
  ],
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, './stylesheet.scss'),
  },
  collections: [
    Categories,
    Products,
    Users,
    Media,
    Sites,
    Companies,
    Configurations,
    Orders,
    ShippingOptions,
    PaymentMethods,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  onInit: async (payload) => {
    // If the `env` var `PAYLOAD_SEED` is set, seed the db
    if (process.env.PAYLOAD_SEED) {
      await seed(payload);
    }
  },
});
