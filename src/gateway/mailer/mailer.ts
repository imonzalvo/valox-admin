import payload from "payload";

export const sendPurchaseConfirmationEmail = (
  emailTo: string,
  business: string
) => {
  payload.sendEmail({
    to: emailTo,
    from: "admin@mitienda.io",
    subject: `Compra ${business}`,
    html: `<h1>Compra ${business}</h1>`,
  });
};
