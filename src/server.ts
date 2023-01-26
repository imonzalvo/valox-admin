import axios from "axios";
import express from "express";
import payload from "payload";
var cors = require("cors");

require("dotenv").config();
const app = express();
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "*");

  // Pass to next layer of middleware
  next();
});

app.use(express.json());

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// Add your own express routes here
app.post("/process_payment", (req, res) => {
  console.log("req", req.body);
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.CELIA_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  const mercadoPagoRequest = {
    description: "Pago de prueba nacho",
    installments: 1,
    payer: req.body.payer,
    token: req.body.token,
    payment_method_id: req.body.paymentMethodId,
    transaction_amount: req.body.transactionAmount,
  };
  axios
    .post("https://api.mercadopago.com/v1/payments", mercadoPagoRequest, config)
    .then((mercadoPagoResponse) => {
      console.log("res", mercadoPagoResponse);
      res.send({
        paymentId: mercadoPagoResponse.data.id,
      });
    })
    .catch((err) => console.log("Erro", err));
});

app.listen(3000);
