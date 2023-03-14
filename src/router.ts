import createPaymentEntrypoint from "./api/entrypoints/createPayment";
import createOrderEntrypoint from "./api/entrypoints/createOrder";
import getCheckoutInfo from "./api/entrypoints/getCheckoutInfo";
import express, { Express, Request, Response } from "express";
import OrderDto from "./api/dtos/orderDto";

export default (app: Express) => {
  app.post("/process_payment/:companyHandle", createPaymentEntrypoint);
  app.post<unknown, unknown, OrderDto>(
    "/create_order/:companyHandle",
    createOrderEntrypoint
  );
  app.post("/checkout/:companyHandle", getCheckoutInfo);
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err);
  });
};
