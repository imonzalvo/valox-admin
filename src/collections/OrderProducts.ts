import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

const OrderProducts: CollectionConfig = {
  slug: "orderProducts",
  admin: {
    useAsTitle: "id",
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "quantity",
      type: "number",
      defaultValue: 1,
    },
    {
      name: "unitPrice",
      type: "number",
      required: true,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      maxDepth: 3,
      label: {
        en: "Product",
        es: "Producto",
      },
    },
    {
      name: "order",
      type: "relationship",
      relationTo: "orders",
      maxDepth: 1,
      required: true,
      label: {
        en: "Order",
        es: "Orden",
      },
    },
  ],
};

export default OrderProducts;
