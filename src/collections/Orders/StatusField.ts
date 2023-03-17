import { Field } from "payload/types";

export const StatusField: Field = {
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
      value: "payment_error",
      label: "Error en pago",
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
};
