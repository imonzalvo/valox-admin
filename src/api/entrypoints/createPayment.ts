import payload from "payload";
import axios from "axios";

const getAccessToken = (handle: string) => {
  const accessTokenVariableName = `${handle.toUpperCase()}_ACCESS_TOKEN`;
  return process.env[accessTokenVariableName];
};

export default async (req, res) => {
  const { companyHandle } = req.params;
  const accessToken = getAccessToken(companyHandle);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  console.log("req.body", req.body);
  const mercadoPagoRequest = {
    description: `Compra ${companyHandle.toLocaleUpperCase()}`,
    installments: req.body.installments,
    payer: req.body.payer,
    token: req.body.token,
    payment_method_id: req.body.paymentMethodId,
    transaction_amount: req.body.transactionAmount,
  };

  const mercadoPagoResponse = await axios.post(
    "https://api.mercadopago.com/v1/payments",
    mercadoPagoRequest,
    config
  );

  const orderStatus = getOrderStatus(mercadoPagoResponse.data);

  const updatedOrder = await payload.update({
    collection: "orders",
    id: req.body.orderId,
    data: {
      payment: {
        mercadopagoId: mercadoPagoResponse.data.id,
        status: mercadoPagoResponse.data.status,
        statusDetail: mercadoPagoResponse.data.status_detail,
      },
      status: orderStatus,
    },
  });

  res.send(updatedOrder);
};

const getOrderStatus = (payment) => {
  if (payment.status == "approved") {
    return "payed"
  } else {
    return "payment_error"
  }
}
