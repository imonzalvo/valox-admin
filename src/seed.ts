import { Payload } from "payload";
import { User, Company, Category } from "./payload-types";

export const seed = async (payload: Payload): Promise<void> => {

  const company1 = await payload.create<Company>({
    collection: 'companies',
    data: {
      name: "Company 1"
    }
  })

  const company2 = await payload.create<Company>({
    collection: 'companies',
    data: {
      name: "Company 2"
    }
  })

  const company3 = await payload.create<Company>({
    collection: 'companies',
    data: {
      name: "Company 3"
    }
  })

await payload.create<Category>({
    collection: 'categories',
    data: {
      name: "Category 1",
      company: company1.id
    }
  })

 await payload.create<Category>({
    collection: 'categories',
    data: {
      name: "Category 2",
      company: company2.id
    }
  })

  await payload.create<Category>({
    collection: 'categories',
    data: {
      name: "Category 3",
      company: company3.id
    }
  })


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
      company: company1.id
    }
  })

  await payload.create<User>({
    collection: 'users',
    data: {
      email: 'seller2@example.com',
      password: 'password',
      firstName: 'Seller2',
      lastName: 'Test',
      roles: ['seller'],
      company: company2.id
    }
  })

  await payload.create<User>({
    collection: 'users',
    data: {
      email: 'seller3@example.com',
      password: 'password',
      firstName: 'Seller3',
      lastName: 'Test',
      roles: ['seller'],
      company: company3.id
    }
  })
}