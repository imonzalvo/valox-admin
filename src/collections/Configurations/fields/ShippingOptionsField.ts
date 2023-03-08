import { Field } from "payload/types";
import { MethodPrice } from "./MethodPriceField";

export const ShippingOptionsField: Field = {
  name: "availableShippingOptions",
  type: "array",
  admin: {
    initCollapsed: true,
  },
  label: {
    en: "Shipping Options",
    es: "Metodos de Envío",
  },
  labels: {
    singular: "Metodo de Envío",
    plural: "Metodos de Envío",
  },
  fields: [
    {
      name: "shippingOption",
      type: "relationship",
      relationTo: "shippingOptions",
    },
    MethodPrice,
  ],
};
