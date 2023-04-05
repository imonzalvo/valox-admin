import payload from "payload";
import { AfterChangeHook } from "payload/dist/collections/config/types";

export const setConfigurationsOnCompany: AfterChangeHook = async ({
  doc,
  operation,
}) => {
  await payload.update({
    collection: "companies",
    id: doc.company,
    data: {
      configurations: doc.id,
    },
  });
  return doc;
};
