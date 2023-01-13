import { buildConfig } from 'payload/config';
import path from 'path';
import Categories from './collections/Categories';
import Products from './collections/Products';
import Tags from './collections/Tags';
import Users from './collections/Users';
import Media from './collections/Media';
import { Sites } from './collections/Sites';
import { seed } from './seed';
import Companies from './collections/Company';

export default buildConfig({
  serverURL: 'http://localhost:3000',
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
