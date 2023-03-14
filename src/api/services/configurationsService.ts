import payload from "payload";
import NotFoundError from "../errors/notFound";

export const getShippingOption = async (id: string, config: any) => {
  try {
    const shippingOption = config.availableShippingOptions.find(
      (shippingOption: any) => shippingOption.id == id
    );

    if (!shippingOption) {
      throw new NotFoundError("Invalid Shipping Option");
    }

    const globalShippingOption = await payload.findByID({
      collection: "shippingOptions",
      id: shippingOption.shippingOption.id,
    });

    if (!globalShippingOption) {
      throw new NotFoundError("Shipping Option not available");
    }

    return shippingOption;
  } catch (e) {
    throw e;
  }
};

export const getPaymentMethod = async (id: string, config: any) => {
  try {
    const paymentMethod = config.availablePaymentMethods.find(
      (paymentMethod: any) => paymentMethod.id == id
    );

    if (!paymentMethod) {
      throw new NotFoundError("Invalid Payment Method");
    }

    const globalPaymentMethod = await payload.findByID({
      collection: "paymentMethods",
      id: paymentMethod.paymentMethod.id,
    });

    if (!globalPaymentMethod) {
      throw new NotFoundError("Payment Method not available");
    }

    return paymentMethod;
  } catch (e) {
    throw e;
  }
};
