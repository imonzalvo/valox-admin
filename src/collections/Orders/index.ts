import { CollectionConfig } from "payload/types";
import { isAdmin } from "../../access/isAdmin";
import { isAdminOrOrderOwner } from "../../access/isAdminOrOrderOwner";
import { ClientInfoField } from "./ClientInfoField";
import { OrderDetails } from "./OrderDetailsField";
import { PaymentField } from "./PaymentField";
import { ProductsField } from "./ProductsField";
import { StatusField } from "./StatusField";

export const OrderFields: CollectionConfig["fields"] = [
  OrderDetails,
  ProductsField,
  ClientInfoField,
  PaymentField,
  {
    name: "clientName",
    type: "text",
    label: {
      en: "Client",
      es: "Cliente",
    },
  },
  {
    name: "company",
    type: "relationship",
    relationTo: "companies",
    hidden: true,
  },
  {
    name: "shippingOption",
    type: "relationship",
    relationTo: "shippingOptions",
    admin: { hidden: true },
  },
  {
    name: "paymentMethod",
    type: "relationship",
    relationTo: "paymentMethods",
    admin: { hidden: true },
  },
  StatusField,
];

const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    defaultColumns: ["createdAt", "status", "clientName"],
    useAsTitle: "createdAt",
    disableDuplicate: true,
    group: "eCommerce",
  },
  labels: {
    singular: {
      es: "Orden",
      en: "Order"
    },
    plural: {
      es: "Ordenes",
      en: "Orders"
    }
  },
  access: {
    create: isAdmin,
    read: isAdminOrOrderOwner,
    update: isAdminOrOrderOwner,
    delete: isAdmin,
  },
  fields: OrderFields,
};

export default Orders;
