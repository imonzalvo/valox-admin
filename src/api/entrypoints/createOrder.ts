import payload from "payload";
import { Request, Response } from "express";
import { Order, OrderProduct } from "../../payload-types";
import OrderDto from "../dtos/orderDto";

export default async (req: Request, res: Response) => {
  const { companyHandle } = req.params;

  const orderDto = req.body;

  console.log("enter", orderDto);
  // Validations
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

  const shippingOption = await getShippingOption(orderDto.shippingOption);
  if (!shippingOption) {
    res.sendStatus(404);
    return;
  }

  console.log("shjipping option", shippingOption);

  const isValidPaymentMethod = await paymentMethodExists(
    orderDto.paymentMethod
  );
  if (!isValidPaymentMethod) {
    res.sendStatus(404);
    return;
  }

  console.log("order products", orderDto.products);
  // Validate Products
  const productIds = orderDto.products.map(
    (orderProduct: any) => orderProduct.id
  );

  const products = await payload
    .find({
      collection: "products",
      where: {
        id: { in: productIds },
      },
    })
    .then((res) => res.docs);

  console.log("prodcuts", products);

  const areProductsValid = await validateProducts(products, company.id);

  if (!areProductsValid) {
    res.sendStatus(400);
    return;
  }

  // Create order

  const newOrder = buildOrderFromDto(orderDto);
  newOrder["company"] = company.id;
  const createdOrder = await payload.create<Order>({
    collection: "orders",
    data: newOrder,
  });

  console.log("orderDto", createdOrder);

  // Create OrderProducts
  const orderProducts = await createOrderProducts(
    products,
    orderDto.products,
    createdOrder.id
  );

  console.log("created products", orderProducts);

  // Calculated values
  const productsAmount = calculateProductsAmount(orderProducts);
  const shippingCost = shippingOption.price;
  const totalAmount = productsAmount + shippingCost;
  const orderProductsIds = orderProducts.map(
    (orderProduct: any) => orderProduct.id
  );

  // Update created order
  const updatedOrder = await payload.update({
    collection: "orders",
    id: createdOrder.id,
    data: {
      productsAmount: productsAmount,
      shippingCost: shippingCost,
      totalAmount: totalAmount,
      products: orderProductsIds,
    },
  });

  console.log("updated order", updatedOrder);

  res.send(updatedOrder);
};

const buildOrderFromDto = (orderDto: OrderDto) => {
  const whitelist = [
    "clientName",
    "clientEmail",
    "clientPhone",
    "address",
    "city",
    "postalCode",
    "shippingOption",
    "paymentMethod",
  ];

  const keys = Object.keys(orderDto);
  const filteredKeys = keys.filter((key) => whitelist.includes(key));

  const filteredObj = filteredKeys.reduce((result, key) => {
    result[key] = orderDto[key];
    return result;
  }, {});
  return filteredObj;
};

const calculateProductsAmount = (orderProducts: any) => {
  return orderProducts.reduce((acc: number, orderProduct: any) => {
    return acc + orderProduct.unitPrice * orderProduct.quantity;
  }, 0);
};

const createOrderProducts = async (
  products: any,
  productsDtos: any,
  orderId: string
) => {
  const createdOrderProducts = await await Promise.all(
    products.map(async (product: any) => {
      const productDto = productsDtos.filter(
        (productDto) => productDto.id == product.id
      )[0];

      const orderProductData = {
        unitPrice: product.price,
        quantity: productDto.quantity,
        order: orderId,
        product: product.id,
      };

      const orderProduct = await payload.create<OrderProduct>({
        collection: "orderProducts",
        data: orderProductData,
      });

      return orderProduct;
    })
  );

  return createdOrderProducts;
};

const validateProducts = async (orderProducts: any, companyId: string) => {
  const companyCategoriesIds = await payload
    .find({
      collection: "categories",
      where: { company: { equals: companyId } },
      limit: 50,
    })
    .then((res) => res.docs.map((category) => category.id))
    .catch(() => []);

  const productsNotInCompanyCategories = orderProducts.filter(
    (product: any) => !companyCategoriesIds.includes(product.id)
  );

  const existsAtLeastOneInvalidProduct =
    productsNotInCompanyCategories.length > 0;

  return existsAtLeastOneInvalidProduct;
};

const getShippingOption = async (shippingOptionId: string) => {
  return await payload
    .findByID({
      collection: "shippingOptions",
      id: shippingOptionId,
    })
    .then((res) => res)
    .catch(() => null);
};

const paymentMethodExists = async (paymentMethodId: string) => {
  return await payload
    .findByID({
      collection: "paymentMethods",
      id: paymentMethodId,
    })
    .then(() => true)
    .catch(() => false);
};
