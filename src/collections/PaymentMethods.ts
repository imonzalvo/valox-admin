import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

export const PaymentMethodFields: CollectionConfig["fields"] = [
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
    name: "mercadopago",
    type: "checkbox",
    defaultValue: false,
    label: {
      en: "MercadoPago",
      es: "MercadoPago",
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
  fields: PaymentMethodFields,
  timestamps: false,
};

export default PaymentMethods;
