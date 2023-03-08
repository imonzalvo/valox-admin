import { Field } from "payload/types";

export const MethodPrice: Field = {
    type: "row",
    fields: [
      {
        name: "cost",
        type: "number",
        defaultValue: 0,
        label: {
          en: "Cost",
          es: "Costo",
        },
      },
      {
        name: "costType",
        type: "select",
        defaultValue: "FIXED",
        options: [
          {
            label: {
              en: "Fixed",
              es: "Cargo Fijo",
            },
            value: "FIXED",
          },
          {
            label: {
              en: "Percentage",
              es: "Porcentaje",
            },
            value: "PERCENTAGE",
          },
        ],
        label: {
          en: "Cost Unit",
          es: "Tipo",
        },
      },
    ],
  };