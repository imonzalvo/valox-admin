import { CollectionConfig } from 'payload/types';
import { isAdminOrCategoryOwner } from '../access/isAdminOrCategoryOwner';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrCategoryOwner,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrCategoryOwner,
    // Only admins can delete
    delete: isAdminOrCategoryOwner,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'company',
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'companies',
      hidden: true,
      defaultValue: ({ user }) => (user.company)
    },
  ],
  timestamps: false,
}

export default Categories;