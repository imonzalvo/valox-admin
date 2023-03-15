import type { BeforeChangeHook } from "payload/dist/collections/config/types";

const removeWhiteSpaces = (filename) => {
  return filename.replace(/\s/g, "");
};
export const renameMedia: BeforeChangeHook = ({ data, req, operation }) => {
  if (operation === "create") {
    let sizes = Object.keys(data["sizes"]);

    sizes.forEach((size) => {
      console.log("size", data[size], size, data["sizes"]["tablet"]);
      
      if (!!data["sizes"][size]["filename"]) {
        data["sizes"][size]["filename"] = removeWhiteSpaces(
          data["sizes"][size]["filename"]
        );
      }
    });

    return {
      ...data,
      filename: removeWhiteSpaces(data.filename),
    };
  }

  return data;
};
