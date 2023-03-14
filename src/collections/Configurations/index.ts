import { CollectionConfig } from "payload/types";
import { isAdmin } from "../../access/isAdmin";
import { isAdminOrConfigurationsOwner } from "../../access/isAdminOrConfigurationsOwner";
import { PaymentMethodsField } from "./fields/PaymentMethodsField";
import { ShippingOptionsField } from "./fields/ShippingOptionsField";

export const ConfigurationFields: CollectionConfig["fields"] = [
  {
    name: "name",
    type: "text",
    label: {
      en: "Name",
      es: "Nombre",
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
    name: "image",
    type: "upload",
    relationTo: "media",
    required: true,
    label: {
      en: "Image",
      es: "Imagen de portada",
    },
  },
  {
    name: "company",
    saveToJWT: true,
    type: "relationship",
    relationTo: "companies",
    defaultValue: ({ user }) => user.company,
  },
  {
    type: "tabs",
    tabs: [
        {
            description: "Metodos de envío habilitados para sus compras",
            label: "Metodos de envío",
            fields: [ShippingOptionsField]
        },
        {
            description: "Metodos de Pago habilitados para sus compras",
            label: "Metodos de Pago",
            fields: [PaymentMethodsField]
        }
    ]
  },
];

const Configurations: CollectionConfig = {
  slug: "configurations",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAdminOrConfigurationsOwner,
    update: isAdminOrConfigurationsOwner,
    delete: isAdminOrConfigurationsOwner,
    create: isAdmin
  },
  fields: ConfigurationFields,
  timestamps: false,
};

export default Configurations;
