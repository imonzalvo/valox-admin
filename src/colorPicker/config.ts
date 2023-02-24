import { Field, Validate } from "payload/types";
import Cell from "./Cell";
import InputField from "./InputField";

export const validateHexColor: Validate<any> = (
  value: string
): true | string => {
  return value && value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/) !== null
    ? `Please give a valid hex color`
    : true;
};

const colorField: Field = {
  name: "color",
  type: "text",
  validate: validateHexColor,
  defaultValue: "#000",
  required: true,
  admin: {
    components: {
      Field: InputField,
      Cell,
    },
  },
};

export default colorField;
