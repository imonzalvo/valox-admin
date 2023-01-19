import { Access } from "payload/config";

export const isAdminOrOwner: Access = async ({ req, id}) => {
  // Need to be logged in
  
  // query another collection using the id
  // const result = await req.payload.

  if (req.user) {
    return true
    // If req.user has role of 'admin'
    if (req.user.roles?.includes('admin')) {
      return true;
    }

    // If any other type of req.user, only provide access to themselves
    return {
      id: {
        equals: req.user.id,
      }
    }
  }

  // Reject everyone else
  return true;
}