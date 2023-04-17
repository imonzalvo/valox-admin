import { CollectionConfig } from "payload/types";
import { isAdmin } from "../../access/isAdmin";
import { isAdminOrConfigurationsOwner } from "../../access/isAdminOrConfigurationsOwner";
import { PaymentMethodsField } from "./fields/PaymentMethodsField";
import { ShippingOptionsField } from "./fields/ShippingOptionsField";
import { setConfigurationsOnCompany } from "./hooks/setConfigurationsOnCompany";

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
    name: "title",
    type: "text",
    admin: {
      placeholder: "El mejor eCommerce",
    },
    label: {
      en: "Title",
      es: "Encabezado de la pagina",
    },
  },
  {
    name: "subtitle",
    type: "text",
    admin: {
      placeholder: "Manualidades hechas en casa",
    },
    label: {
      en: "Subtitle",
      es: "Subtitulo",
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
    admin: {
      hidden: true
    }
  },
  {
    name: "generalInformation",
    type: "group",
    fields: [
      {
        name: "phone",
        type: "text",
        label: {
          en: "Phone",
          es: "Telefono",
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
        name: "links",
        type: "group",
        fields: [
          {
            name: "instagram",
            type: "text",
          },
          {
            name: "twitter",
            type: "text",
          },
          {
            name: "facebook",
            type: "text",
          },
        ],
      },
    ],
  },
  {
    type: "tabs",
    tabs: [
      {
        description: "Metodos de envío habilitados para sus compras",
        label: "Metodos de envío",
        fields: [ShippingOptionsField],
      },
      {
        description: "Metodos de Pago habilitados para sus compras",
        label: "Metodos de Pago",
        fields: [PaymentMethodsField],
      },
    ],
  },
];

const Configurations: CollectionConfig = {
  slug: "configurations",
  admin: {
    useAsTitle: "name",
    group: "eCommerce",
  },
  labels: {
    singular: {
      es: "Configuración",
      en: "Configuration",
    },
    plural: {
      es: "Configuraciones",
      en: "Configurations",
    },
  },
  access: {
    read: isAdminOrConfigurationsOwner,
    update: isAdminOrConfigurationsOwner,
    delete: isAdminOrConfigurationsOwner,
    create: isAdmin,
  },
  hooks: {
    afterChange: [setConfigurationsOnCompany],
  },
  fields: ConfigurationFields,
  timestamps: false,
};

export default Configurations;
