import { Payload } from "payload";
import { User, Company, Category } from "./payload-types";

export const seed = async (payload: Payload): Promise<void> => {

  // Local API methods skip all access control by default
  // so we can easily create an admin user directly in init
  await payload.create<User>({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      password: 'password',
      firstName: 'Payload',
      lastName: 'CMS',
      roles: ['admin']
    }
  })

  await payload.create<User>({
    collection: 'users',
    data: {
      email: 'seller1@example.com',
      password: 'password',
      firstName: 'Seller1',
      lastName: 'Test',
      roles: ['seller'],
    }
  })
}