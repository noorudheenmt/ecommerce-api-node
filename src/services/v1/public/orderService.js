import Order from "#models/order.js";
import Cart from "#models/cart.js";

// createOrder service
export const createOrder = async (userId, data, log) => {
  try {
    log("Cart.findOne execution started");
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    log("Cart.findOne execution completed");

    // Check if cart exists
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    log("Order.create execution started");
    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      paymentMethod: data.paymentMethod,
    });
    log("Order.create execution completed");

    log("Cart.deleteOne execution started");
    await Cart.deleteOne({ user: userId });
    log("Cart.deleteOne execution completed");

    const orderObj = order.toObject();
    delete orderObj.__v;

    return {
      message: "Order placed successfully",
      data: orderObj,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// getOrders service
export const getOrders = async (userId, log) => {
  try {
    log("Order.find execution started");
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .select("-__v");
    log("Order.find execution completed");

    return {
      message: "Orders fetched successfully",
      data: orders,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// getOrderById service
export const getOrderById = async (userId, orderId, log) => {
  try {
    log("Order.findOne execution started");
    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    })
      .select("-__v")
      .populate("items.product");
    log("Order.findOne execution completed");

    // Check if order exists
    if (!order) throw new Error("Order not found");

    return {
      message: "Order details fetched successfully",
      data: order,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// cancelOrder service
export const cancelOrder = async (userId, orderId, log) => {
  try {
    log("Order.findOne execution started");
    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    }).select("-__v");
    log("Order.findOne execution completed");

    // Check if order exists
    if (!order) throw new Error("Order not found");

    if (!["PLACED", "CONFIRMED"].includes(order.status)) {
      throw new Error("Order cannot be cancelled");
    }

    order.status = "CANCELLED";
    await order.save();

    return {
      message: "Order cancelled successfully",
      data: order,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
