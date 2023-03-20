import payload from "payload";
import NotFoundError from "../errors/notFound";

const getCompanyCategories = async (companyId: string) => {
  const categoriesQuery = await payload.find({
    collection: "categories",
    where: { company: { equals: companyId } },
    limit: 150,
  });

  if (!categoriesQuery) {
    throw new NotFoundError("Company not found");
  }

  return categoriesQuery.docs;
};

const getCategoriesTrees = async (companyId: string) => {
  const categories = await getCompanyCategories(companyId);

  const formatedCategories = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      parent: category.parent?.id,
    };
  });

  const parents = formatedCategories.filter((category) => !category.parent);
  const trees = parents.map((parent) => {
    const tree = makeTree(formatedCategories, parent.id);
    const res = {
      id: parent.id,
      name: parent.name,
      children: tree,
    };
    return res;
  });

  return trees;
};

const makeTree = (categories, parent) => {
  // At each level of the tree, we create a node object
  let node = {};
  // We filter the category list for categories where
  // the category's parent property matches the parent we
  // were passed in.
  const matchingCategories = categories.filter((category) => {
    return category.parent === parent;
  });

  // Then we loop through each of the matching categories
  let branches = [];
  matchingCategories.forEach((category) => {
    // and set a property on the node with the key
    // of the category.id and the value as the result
    // of calling makeTree recursively to handle the next
    // category down.

    // node[category.id] = makeTree(categories, category.id);
    branches.push({
      id: category.id,
      name: category.name,
      children: makeTree(categories, category.id),
    });
  });
  // We return the node at the end, so it will get stored
  // on the parent node in the tree.
  node[parent] = branches;
  return branches;
};

export { getCompanyCategories, getCategoriesTrees };
