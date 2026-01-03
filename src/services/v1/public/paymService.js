import crypto from "crypto";
import Cart from "#models/cart.js";
import Order from "#models/order.js";
import config from "#config/config.js";
import razorpay from "#config/razorpay.js";

// createPaymentOrder service
export const createPaymentOrder = async (userId, log) => {
  log("Cart.findOne execution started");
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  log("Cart.findOne execution completed");

  if (!cart || cart.items.length === 0) {
    const err = new Error("Cart is empty");
    err.statusCode = 404;
    throw err;
  }

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Razorpay amount in paise
  const razorpayOrder = await razorpay.orders.create({
    amount: totalAmount * 100,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
  });

  // Save order in DB (PENDING)
  const order = await Order.create({
    user: userId,
    items: cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
      price: i.product.price,
    })),
    totalAmount,
    paymentMethod: "ONLINE",
    paymentStatus: "PENDING",
    razorpayOrderId: razorpayOrder.id,
  });

  return {
    message: "Razorpay order created",
    data: {
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    },
  };
};

// handleWebhook service
export const handleWebhook = async (req, log) => {
  try {
    const secret = config.RAZORPAY_WEBHOOK_SECRET;
    // get signature from headers
    const signature = req.headers["x-razorpay-signature"];

    if (!signature) {
      const err = new Error("Missing Razorpay signature");
      err.statusCode = 400;
      throw err;
    }

    // raw body
    const body = req.body;

    // verify signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      const err = new Error("Invalid webhook signature");
      err.statusCode = 400;
      throw err;
    }

    // parse body
    const event = JSON.parse(body.toString());
    log(`Webhook received: ${event.event}`);

    let response = {
      message: "Webhook received",
      event: event.event,
    };

    // handle payment.captured event
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;

      log("Order.findOne execution started");
      const order = await Order.findOne({ razorpayOrderId });
      log("Order.findOne execution completed");

      if (!order) {
        log("Order not found for webhook", "error");
        return response;
      }

      if (order.paymentStatus === "PAID") {
        log("Payment already processed");
        return response;
      }

      await Order.updateOne(
        { razorpayOrderId },
        {
          paymentStatus: "PAID",
          paymentId: payment.id,
        }
      );
      log("Cart.deleteOne execution started");
      await Cart.deleteOne({ user: order.user });
      log("Cart.deleteOne execution completed");
      log(`Order ${razorpayOrderId} marked as PAID`);

      response = {
        message: "Payment captured successfully",
        orderId: razorpayOrderId,
        paymentId: payment.id,
      };
    }
    return response;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
