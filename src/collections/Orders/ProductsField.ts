import { Field } from "payload/types";

export const ProductsField: Field = {
  name: "products",
  type: "array",
  label: {
    en: "Products",
    es: "Productos",
  },
  labels: {
    singular: "Producto",
    plural: "Productos",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: {
        en: "Product",
        es: "Producto",
      },
    },
    {
      name: "quantity",
      type: "number",
      defaultValue: 1,
      label: {
        en: "Quantity",
        es: "Cantidad",
      },
    },
    {
      name: "unitPrice",
      type: "number",
      required: true,
      label: {
        en: "Unit Price",
        es: "Precio por unidad",
      },
    },
    {
      name: "productId",
      type: "text",
      label: "ID",
    },
  ],
};
