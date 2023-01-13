import { buildConfig } from 'payload/config';
import path from 'path';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';

import Categories from './collections/Categories';
import Products from './collections/Products';
import Tags from './collections/Tags';
import Users from './collections/Users';
import Media from './collections/Media';
import { Sites } from './collections/Sites';
import Companies from './collections/Company';
import { seed } from './seed';

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
  },
  bucket: process.env.S3_BUCKET,
})

export default buildConfig({
  serverURL: 'http://localhost:3000',
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter: adapter,
          disableLocalStorage: true,
          prefix: "media/images"
        },
      },
    }),
  ],
  admin: {
    user: Users.slug,
  },
  collections: [
    Categories,
    Products,
    Tags,
    Users,
    Media,
    Sites,
    Companies
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  onInit: async (payload) => {
    // If the `env` var `PAYLOAD_SEED` is set, seed the db
    if (process.env.PAYLOAD_SEED) {
      await seed(payload);
    }
  }
});
