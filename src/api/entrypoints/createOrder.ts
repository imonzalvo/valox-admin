import payload from "payload";
import { Request, Response } from "express";
import OrderDto from "../dtos/orderDto";
import { getCompanyConfigurationByHandle } from "../services/companiesService";
import {
  getProductsByIds,
  validateProducts,
} from "../services/productsService";
import {
  getPaymentMethod,
  getShippingOption,
} from "../services/configurationsService";
import ValidationError from "../errors/validationError";

export default async (req: Request, res: Response, next) => {
  const { companyHandle } = req.params;

  const orderDto = req.body;

  try {
    // Validations

    // Validate Company
    const company = await payload
      .find({
        collection: "companies",
        where: { handle: { equals: companyHandle } },
      })
      .then((res) => {
        return res.docs[0];
      });

    if (!company) {
      res.sendStatus(404);
      return;
    }

    const configutarions = await getCompanyConfigurationByHandle(companyHandle);

    const shippingOption = await getShippingOption(
      orderDto.shippingOption,
      configutarions
    );

    const paymentMethod = await getPaymentMethod(
      orderDto.paymentMethod,
      configutarions
    );

    // Validate Products
    const productIds = orderDto.products.map(
      (orderProduct: any) => orderProduct.id
    );
    const products = await getProductsByIds(productIds);

    const areProductsValid = await validateProducts(products, company.id);

    if (!areProductsValid) {
      throw new ValidationError("One or more products are invalid");
    }

    // Build OrderProducts
    const orderProducts = buildOrderProducts(products, orderDto.products);

    // Calculated values
    const productsAmount = calculateProductsAmount(orderProducts);
    const shippingCost = shippingOption.cost;
    const paymentMethodCost = paymentMethod.cost;
    const totalAmount = productsAmount + shippingCost + paymentMethodCost;

    // Create order
    const clientInfo = buildClientInfoFromDto(orderDto);

    const orderDetails = {
      paymentMethod: paymentMethod.paymentMethod.name,
      shippingOption: shippingOption.shippingOption.name,
      productsAmount: productsAmount,
      shippingCost: shippingCost,
      paymentMethodCost: paymentMethodCost,
      totalAmount: totalAmount,
      notes: orderDto.notes,
    };

    const orderData = {
      company: company.id,
      shippingOption: shippingOption.shippingOption.id,
      paymentMethod: paymentMethod.paymentMethod.id,
      clientInfo: clientInfo,
      products: orderProducts,
      details: orderDetails,
      clientName: getClientName(orderDto),
    };

    const createdOrder = await payload.create({
      collection: "orders",
      data: orderData,
    });

    res.send(createdOrder);
  } catch (e) {
    return next(e);
  }
};

const buildClientInfoFromDto = (orderDto: OrderDto) => {
  const clientWhitelist = [
    "clientName",
    "clientLastName",
    "clientEmail",
    "clientPhone",
    "address",
    "city",
    "postalCode",
  ];

  const keys = Object.keys(orderDto);
  const clientInfoKeys = keys.filter((key) => clientWhitelist.includes(key));

  return clientInfoKeys.reduce((result, key) => {
    result[key] = orderDto[key];
    return result;
  }, {});
};

const getClientName = (orderDto: any) => {
  return orderDto.clientName;
};

const calculateProductsAmount = (orderProducts: any) => {
  return orderProducts.reduce((acc: number, orderProduct: any) => {
    return acc + orderProduct.unitPrice * orderProduct.quantity;
  }, 0);
};

const buildOrderProducts = (products: any, productsDtos: any) => {
  return products.map((product: any) => {
    const productDto = productsDtos.filter(
      (productDto: any) => productDto.id == product.id
    )[0];

    return {
      unitPrice: product.price,
      quantity: productDto.quantity,
      title: product.title,
      product: product.id,
    };
  });
};
