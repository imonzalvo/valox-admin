import { Field } from "payload/types";
import { MethodPrice } from "./MethodPriceField";

export const PaymentMethodsField: Field = {
  type: "array",
  name: "availablePaymentMethods",
  admin: {
    initCollapsed: true,
  },
  label: {
    en: "Payment Methods",
    es: "Metodos de Pago",
  },
  labels: {
    singular: "Metodo de Pago",
    plural: "Metodos de Pago",
  },
  fields: [
    {
      name: "paymentMethod",
      type: "relationship",
      relationTo: "paymentMethods",
    },
    MethodPrice,
  ],
};
