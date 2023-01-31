import axios from "axios";

const getAccessToken = (handle: string) => {
    const accessTokenVariableName = `${handle.toUpperCase()}_ACCESS_TOKEN`;
    return process.env[accessTokenVariableName];
  };

  
export default (req, res) => {
    const { companyHandle } = req.params;
    const accessToken = getAccessToken(companyHandle);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const mercadoPagoRequest = {
      description: `Compra ${companyHandle.toLocaleUpperCase()}`,
      installments: 1,
      payer: req.body.payer,
      token: req.body.token,
      payment_method_id: req.body.paymentMethodId,
      transaction_amount: req.body.transactionAmount,
    };
  
    axios
      .post("https://api.mercadopago.com/v1/payments", mercadoPagoRequest, config)
      .then((mercadoPagoResponse) => {
        res.send({
          paymentId: mercadoPagoResponse.data.id,
        });
      })
      .catch((err) => console.log("Error payment", err));
  }