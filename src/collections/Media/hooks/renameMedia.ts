import type { BeforeChangeHook } from "payload/dist/collections/config/types";

const formatFileName = (filename: string) => {
  const newFileName = filename.replace(/\s/g, "");

  const random = (Math.random() + 1).toString(36).substring(7);

  return `${random}-${newFileName}`;
};
export const renameMedia: BeforeChangeHook = ({ data, req, operation }) => {
  if (operation === "create") {
    let sizes = Object.keys(data["sizes"]);

    sizes.forEach((size) => {
      console.log("size::", data, size);

      if (!!data["sizes"][size]["filename"]) {
        data["sizes"][size]["filename"] = formatFileName(
          data["sizes"][size]["filename"]
        );
      }
    });

    console.log("data::", {
      ...data,
      filename: formatFileName(data.filename),
    });
    return {
      ...data,
      filename: formatFileName(data.filename),
    };
  }

  return data;
};
