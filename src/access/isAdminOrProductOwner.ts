import { Access } from "payload/config";

export const isAdminOrProductOwner: Access = async ({ req }) => {
  // Need to be logged in
  if (req.user) {
    // If req.user has role of 'admin'
    if (req.user.roles.includes("admin")) return true;

    const userCategories = await req.payload.find({
      collection: "categories",
      where: { company: { equals: req.user.company } },
    });

    const userCategoriesIds = userCategories.docs.map(category => category.id)

    return {
      category: {
        in: userCategoriesIds,
      },
    };
  }
  // Reject everyone else
  return true;
};
