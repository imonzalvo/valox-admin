import { CollectionConfig } from "payload/types";
import { renameMedia } from "./hooks/renameMedia";

const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "General",
  },
  access: {
    read: () => true,
  },
  fields: [],
  hooks: {
    beforeChange: [renameMedia]
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    disableLocalStorage: true,
    mimeTypes: ['image/webp', 'image/png, image/jpg', 'image/jpeg'], 
    formatOptions: {
      format: "webp",
      options: { quality: 60, alphaQuality: 50},
    },
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: { quality: 60, alphaQuality: 50},
        }
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: { quality: 15, alphaQuality: 20},
        }
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: { quality: 15, alphaQuality: 20},
        }
      },
    ],
    adminThumbnail: "thumbnail",
  },
};

export default Media;
