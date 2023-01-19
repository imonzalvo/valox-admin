import { CollectionConfig } from 'payload/types';
import { isAdminOrConfigurationsOwner } from '../access/isAdminOrConfigurationsOwner';
import colorField from '../colorPicker/config';

const Configurations: CollectionConfig = {
  slug: 'configurations',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrConfigurationsOwner,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrConfigurationsOwner,
    // Only admins can delete
    delete: isAdminOrConfigurationsOwner,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'company',
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'companies',
      hidden: true,
      defaultValue: ({ user }) => (user.company)
    }
  ],
  timestamps: false,
}

export default Configurations;