import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

export const ShippingOptionsFields: CollectionConfig["fields"] = [
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
];

const PaymentMethods: CollectionConfig = {
  slug: "paymentMethods",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  fields: ShippingOptionsFields,
  timestamps: false,
};

export default PaymentMethods;
