import payload from "payload";
import NotFoundError from "../errors/notFound";

const getCompanyByHandle = async (handle: string) => {
  const company = await payload
    .find({
      collection: "companies",
      where: { handle: { equals: handle } },
    })
    .then((res) => {
      if (res.totalDocs == 0) {
        throw new NotFoundError("Company not found");
      }

      return res.docs[0];
    });

  return company;
};

const getCompanyConfigurationByHandle = async (handle: string) => {
  try {
    const company = await getCompanyByHandle(handle);

    return company.configurations;
  } catch (e) {
    throw e;
  }
};

export { getCompanyByHandle, getCompanyConfigurationByHandle };
