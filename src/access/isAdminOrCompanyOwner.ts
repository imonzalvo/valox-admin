import { Access } from "payload/config";

export const isAdminOrCompanyOwner: Access =
  ({ req: { user } }) => {
    // Need to be logged in
    if (user) {
      // If user has role of 'admin'
      if (user.roles.includes("admin")) return true;

      return {
        id: {
          equals: user.company,
        },
      };
    }

    // Reject everyone else
    return true;
  };
