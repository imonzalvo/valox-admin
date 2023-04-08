import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

const ShippingOptions: CollectionConfig = {
  slug: "shippingOptions",
  admin: {
    useAsTitle: "name",
    group: "General",
  },
  labels: {
    singular: {
      es: "Metodo de envío",
      en: "Shipping Option",
    },
    plural: {
      es: "Metodos de envío",
      en: "Shipping Options",
    },
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
  ],
  timestamps: false,
};

export default ShippingOptions;
