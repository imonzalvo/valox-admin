import { CollectionConfig } from 'payload/types';
import { isAdminOrProductOwner } from '../access/isAdminOrProductOwner';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    defaultColumns: ['title', 'price'],
    useAsTitle: 'Productos',
  },
  access: {
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrProductOwner,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrProductOwner,
    // Only admins can delete
    delete: isAdminOrProductOwner,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'users',
      hidden: true,
      defaultValue: ({ user }) => (user.company)
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories'
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'published',
          label: 'Published',
        },
      ],
      defaultValue: 'published',
      admin: {
        position: 'sidebar',
      }
    }
  ],
}

export default Products;