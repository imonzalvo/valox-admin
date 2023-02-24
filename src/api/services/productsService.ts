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

export { getProductsByIds };
