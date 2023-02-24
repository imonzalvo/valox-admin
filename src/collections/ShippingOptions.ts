import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

const ShippingOptions: CollectionConfig = {
  slug: "shippingOptions",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: {
        en: "Type",
        es: "Tipo",
      },
    },
    {
      name: "description",
      type: "text",
      label: {
        en: "Description",
        es: "Descripción",
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
  ],
  timestamps: false,
};

export default ShippingOptions;
