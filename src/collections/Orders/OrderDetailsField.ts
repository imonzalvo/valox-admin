import { Field } from "payload/types";

export const OrderDetails: Field = {
  name: "details",
  type: "group",
  label: {
    en: "Order Info",
    es: "Detalles",
  },
  fields: [
    {
      name: "totalAmount",
      type: "number",
      label: {
        en: "Total Amount",
        es: "Monto Total",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "productsAmount",
          type: "number",
          label: {
            en: "Products Amount",
            es: "Monto Total Productos",
          },
          admin: {
            width: "33%",
          },
        },
        {
          name: "shippingCost",
          type: "number",
          label: {
            en: "Shipping Cost",
            es: "Costo de Envío",
          },
          admin: {
            width: "33%",
          },
        },
        {
          name: "paymentMethodCost",
          type: "number",
          label: {
            en: "Payment Method Cost",
            es: "Costo por método de pago",
          },
          admin: {
            width: "33%",
          },
        },
      ],
    },
    {
      name: "shippingOption",
      type: "text",
      label: {
        en: "Shipping Option",
        es: "Forma de envío",
      },
    },
    {
      name: "paymentMethod",
      type: "text",
      label: {
        en: "Payment Method",
        es: "Método de pago",
      },
    },
    {
      name: "notes",
      type: "text",
      label: {
        en: "Notes",
        es: "Comentarios",
      },
    },
  ],
};
