import { CollectionConfig } from "payload/types";
import { isAdminOrCompanyOwner } from "../access/isAdminOrCompanyOwner";

const Companies: CollectionConfig = {
  slug: "companies",
  admin: {
    useAsTitle: "name",
  },
  access: {
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrCompanyOwner,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrCompanyOwner,
    // Only admins can delete
    delete: isAdminOrCompanyOwner,
  },
  fields: [
    {
      name: "handle",
      type: "text",
      unique: true,
      validate: (val, { operation }) => {
        if (!/[a-z0-9]/.test(val)) {
          return "Este campo solo puede contener letras en minuscula o numeros.";
        }
        return true;
      },
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "configurations",
      type: "relationship",
      relationTo: "configurations",
      hidden: true,
      defaultValue: ({ user }) => {
        user.id;
      },
    },
  ],
  timestamps: false,
  endpoints: [
    {
      path: "/handle/:handle",
      method: "get",
      handler: async (req, res, next) => {
        const companyQuery = await req.payload.find({
          collection: "companies",
          where: { handle: { equals: req.params.handle } },
        });

        if (!companyQuery || !companyQuery.docs[0]) {
          res.status(404).send({ error: "not found" });
        }

        const company = companyQuery.docs[0];

        const categories = await getCategories(req, res);
        const products = await getProducts(req, res, categories);
        const configurations = await getConfigurations(req, res, company);

        res
          .status(200)
          .send({ company, categories: categories, products: products, configurations: configurations });
      },
    },
  ],
};

const getCategories = async (req, res) => {
  const categoriesQuery = await req.payload.find({
    collection: "categories",
    where: { company: { equals: req.params.id } },
    limit: 50,
  });

  if (!categoriesQuery) {
    res.status(404).send({ error: "not found" });
  }

  return categoriesQuery.docs;
};

const getProducts = async (req, res, categories) => {
  const categoriesIds = categories.map((category) => category.id);
  const productsQuery = await req.payload.find({
    collection: "products",
    where: {
      category: { in: categoriesIds },
    },
  });

  if (!productsQuery) {
    res.status(404).send({ error: "not found" });
  }

  return productsQuery.docs;
};

const getConfigurations = async (req, res, company) => {
  const configurations = await req.payload.find({
    collection: "configurations",
    where: {
      company: { equals: company.id },
    },
  });

  if (!configurations) {
    res.status(404).send({ error: "not found" });
  }

  return configurations.docs[0];
};

export default Companies;
