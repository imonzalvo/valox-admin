import { CollectionConfig } from "payload/types";
import { isAdminOrProductOwner } from "../access/isAdminOrProductOwner";

const Products: CollectionConfig = {
  slug: "products",
  admin: {
    defaultColumns: ["title", "price"],
    useAsTitle: "Productos",
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
    // Product Info
    {
      name: "title",
      type: "text",
      label: {
        en: "Title",
        es: "Titulo",
      },
    },
    {
      name: "price",
      type: "number",
      label: {
        en: "Price",
        es: "Precio",
      },
    },
    {
      name: "description",
      type: "text",
      required: true,
      label: {
        en: "Description",
        es: "Descripción",
      },
    },
    // Relationships
    {
      name: "creator",
      type: "relationship",
      relationTo: "companies",
      hidden: true,
      defaultValue: ({ user }) => user.company,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: {
        en: "Category",
        es: "Categoría",
      },
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          maxDepth: 3,
          required: true,
        },
      ],
      label: {
        en: "Images",
        es: "Imagenes",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          value: "draft",
          label: "Draft",
        },
        {
          value: "published",
          label: "Published",
        },
      ],
      defaultValue: "published",
      admin: {
        position: "sidebar",
      },
      label: {
        en: "Status",
        es: "Status",
      },
    },
  ],
};

export default Products;
