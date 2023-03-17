import { group } from "console";
import { Field } from "payload/types";

export const PaymentField: Field = {
  name: "payment",
  type: "group",
  fields: [
    {
      name: "mercadopagoId",
      type: "text",
    },
    {
        name: "status",
        type: "text",
      },
      {
        name: "statusDetail",
        type: "text",
      },
  ],
};
