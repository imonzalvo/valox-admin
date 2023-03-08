import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrOrderOwner } from "../access/isAdminOrOrderOwner";
const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    defaultColumns: [
      "status",
      "createdAt",
      "shippingOption",
      "paymentMethod",
      "clientName",
    ],
    useAsTitle: "createdAt",
    disableDuplicate: true,
  },
  access: {
    create: isAdmin,
    read: isAdminOrOrderOwner,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    // Order info
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
            width: "50%",
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
            width: "50%",
          },
        },
      ],
    },
    {
      name: "shippingOption",
      type: "relationship",
      relationTo: "shippingOptions",
      required: true,
      label: {
        en: "Shipping Option",
        es: "Forma de envío",
      },
    },
    {
      name: "paymentMethod",
      type: "relationship",
      relationTo: "paymentMethods",
      required: true,
      label: {
        en: "Payment Method",
        es: "Método de pago",
      },
    },
    {
      name: "company",
      type: "relationship",
      relationTo: "companies",
      hidden: true,
      label: {
        en: "Company",
        es: "Companía",
      },
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "orderProducts",
      hasMany: true,
      maxDepth: 3,
      label: {
        en: "Products",
        es: "Productos",
      },
    },
    // Client info
    {
      name: "clientName",
      type: "text",
      label: {
        en: "Name",
        es: "Nombre",
      },
    },
    {
      name: "address",
      type: "text",
      label: {
        en: "Address",
        es: "Dirección",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "clientEmail",
          type: "text",
          label: {
            en: "Email",
            es: "Email",
          },
          admin: {
            width: "50%",
          },
        },
        {
          name: "clientPhone",
          type: "text",
          label: {
            en: "Phone",
            es: "Teléfono",
          },
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "description",
      type: "text",
      admin: {
        description: ({ value }) =>
          `${
            typeof value === "string" ? 20 - value.length : "20"
          } characters left`,
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "city",
          type: "text",
          label: {
            en: "City",
            es: "Departamento",
          },
          admin: {
            width: "50%",
          },
        },
        {
          name: "postalCode",
          type: "text",
          label: {
            en: "Postal Code",
            es: "Código Postal",
          },
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "notes",
      type: "text",
      label: {
        en: "Notes",
        es: "Comentarios",
      },
    },
    // Order status
    {
      name: "status",
      type: "select",
      options: [
        {
          value: "unconfirmed",
          label: "Sin Confirmar",
        },
        {
          value: "pending",
          label: "Pendiente",
        },
        {
          value: "payed",
          label: "Paga",
        },
        {
          value: "shipped",
          label: "Enviada",
        },
      ],
      label: {
        en: "Status",
        es: "Status",
      },
      defaultValue: "unconfirmed",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Orders;
