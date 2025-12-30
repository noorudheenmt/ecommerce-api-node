import Order from "#models/order.js";

// getAllOrders service
export const getAllOrders = async (query, log) => {
  try {
    const filter = {};

    if (query.status) filter.status = query.status;
    if (query.userId) filter.user = query.userId;

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    log("Order.find execution started");
    const orders = await Order.find(filter)
      .populate("user", "email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
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

// updateOrderStatus service
export const updateOrderStatus = async (orderId, newStatus, log) => {
  try {
    const STATUS_FLOW = {
      PLACED: ["CONFIRMED", "CANCELLED"],
      CONFIRMED: ["SHIPPED", "CANCELLED"],
      SHIPPED: ["DELIVERED"],
      DELIVERED: [],
      CANCELLED: [],
    };

    log("Order.findById execution started");
    const order = await Order.findById(orderId);
    log("Order.findById execution completed");

    // Check if order exists
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    // Validate status transition
    const allowedNextStatuses = STATUS_FLOW[order.status] || [];

    if (!allowedNextStatuses.includes(newStatus)) {
      const error = new Error(
        `Invalid status transition from ${order.status} to ${newStatus}`
      );
      error.statusCode = 400;
      throw error;
    }

    order.status = newStatus;
    await order.save();

    return {
      message: "Order status updated successfully",
      data: order,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
