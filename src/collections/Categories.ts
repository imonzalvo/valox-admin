import { CollectionConfig } from "payload/types";
import { isAdminOrCategoryOwner } from "../access/isAdminOrCategoryOwner";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
  },
  access: {
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrCategoryOwner,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrCategoryOwner,
    // Only admins can delete
    delete: isAdminOrCategoryOwner,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "company",
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: "relationship",
      relationTo: "companies",
      hidden: true,
      defaultValue: ({ user }) => user.company,
    },
  ],
  endpoints: [
    {
      path: "/:id/products",
      method: "get",
      handler: async (req, res, next) => {
        await later(1000)
        await req.payload
          .findByID({
            collection: "categories",
            id: req.params.id,
          })
          .then(async (category) => {
            const products = await getProducts(req, res, req.params.id);
            res.status(200).send({ ...category, products });
          })
          .catch(() => res.status(404).send({ error: "not found" }));
      },
    },
  ],
  timestamps: false,
};

function later(delay) {
  return new Promise(function(resolve) {
      setTimeout(resolve, delay);
  });
}

const getProducts = async (req, res, categoryId) => {
  const productsQuery = await req.payload.find({
    collection: "products",
    where: {
      category: { equals: categoryId },
    },
  });

  if (!productsQuery) {
    res.status(404).send({ error: "not found" });
  }

  return productsQuery.docs;
};

export default Categories;
