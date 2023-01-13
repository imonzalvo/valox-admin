import { CollectionConfig } from 'payload/types';
import { isAdminOrCompanyOwner } from '../access/isAdminOrCompanyOwner';

const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrCompanyOwner,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrCompanyOwner,
    // Only admins can delete
    delete: isAdminOrCompanyOwner,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'configurations',
      type: 'relationship',
      relationTo: 'configurations',
      hidden: true,
      defaultValue: ({ user }) => (user.company)
    },
  ],
  timestamps: false,
  endpoints: [
    {
      path: '/:id',
      method: 'get',
      handler: async (req, res, next) => {
        console.log("params", req.params.id)
        const company = await req.payload.findByID({
          collection: "companies",
          id: req.params.id
        });

        const categoriesQuery = await req.payload.find({
          collection: "categories",
          where: { company: { equals: req.params.id } },
          limit: 50
        });

        if (company) {
          res.status(200).send({ company, categories: categoriesQuery.docs });
        } else {
          res.status(404).send({ error: 'not found' });
        }
      }
    }
  ],
}

export default Companies;