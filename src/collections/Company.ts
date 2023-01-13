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
    }
  ],
  timestamps: false,
}

export default Companies;