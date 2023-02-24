import { CollectionConfig } from 'payload/types';
import { isAdminFieldLevel } from '../access/isAdmin';
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
      label: {
        en: 'Name', es: 'Nombre',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: {
        en: 'Description', es: 'Descripción',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        en: 'Image', es: 'Imagen de portada',
      },
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
    {
      name: "availableShippingOptions",
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: "relationship",
      relationTo: "shippingOptions",
      hasMany: true,
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
        read: isAdminFieldLevel
      },
    },
    {
      name: "availablePaymentMethods",
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: "relationship",
      relationTo: "paymentMethods",
      hasMany: true,
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
        read: isAdminFieldLevel
      },
    },
  ],
  timestamps: false,
}

export default Configurations;