import { Access } from "payload/config";

export const isAdminOrCategoryOwner: Access =
  ({ req: { user } }) => {
    // Need to be logged in
    if (user) {
      // If user has role of 'admin'
      if (user.roles.includes("admin")) return true;

      // Otherwise, we can restrict it based on the `company` field
      return {
        company: {
          equals: user.company,
        },
      };
    }

    // Reject everyone else
    return true;
  };
