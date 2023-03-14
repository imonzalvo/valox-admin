import { Field } from "payload/types";

export const ClientInfoField: Field = {
  name: "clientInfo",
  type: "group",
  label: {
    en: "Client Info",
    es: "Información del Cliente",
  },
  fields: [
    {
      name: "clientName",
      type: "text",
      label: {
        en: "Name",
        es: "Nombre",
      },
    },
    {
      name: "clientLastName",
      type: "text",
      label: {
        en: "Last Name",
        es: "Apellido",
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
  ],
};
