import payload from "payload";
import { Request, Response } from "express";

import { getProductsByIds } from "../services/productsService";
import { getCompanyConfigurationByHandle } from "../services/companiesService";

export default async (req: Request, res: Response, next) => {
  const { companyHandle } = req.params;
  try {
    const companyConfigutarion = await getCompanyConfigurationByHandle(
      companyHandle
    );

    const productsIds = req.body.products.map((product) => product.id);
    const products = await getProductsByIds(productsIds, 0);

    //TODO: Add products stock
    const checkoutInfo = {
      shippingOptions: companyConfigutarion.availableShippingOptions,
      paymentMethods: companyConfigutarion.availablePaymentMethods,
      products,
    };

    res.send(checkoutInfo);
  } catch (e) {
    return next(e);
  }
};
