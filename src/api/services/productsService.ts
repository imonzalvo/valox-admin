import payload from "payload";

const getProductsByIds = async (ids: string[], depth?: number) => {
  const documentsDepth = depth == undefined ? 2 : depth;

  const products = await payload
    .find({
      collection: "products",
      where: {
        id: { in: ids },
      },
      depth: documentsDepth,
    })
    .then((res) => res.docs);

  return products;
};

const validateProducts = async (products: any, companyId: string) => {
  const companyCategoriesIds = await payload
    .find({
      collection: "categories",
      where: { company: { equals: companyId } },
      limit: 50,
    })
    .then((res) => res.docs.map((category) => category.id))
    .catch(() => []);

  const productsNotInCompanyCategories = products.filter(
    (product: any) => !companyCategoriesIds.includes(product.id)
  );

  const existsAtLeastOneInvalidProduct =
    productsNotInCompanyCategories.length > 0;

  return existsAtLeastOneInvalidProduct;
};

export { getProductsByIds, validateProducts };
