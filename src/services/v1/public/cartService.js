import Cart from "#models/cart.js";

// getCart service
export const getCart = async (userId, log) => {
  try {
    log("Cart.findOne execution started");
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .select("-__v");
    log("Cart.findOne execution completed");

    return {
      message: "Cart fetched successfully",
      data: cart || { items: [] },
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// addToCart service
export const addToCart = async (userId, data, log) => {
  try {
    const { productId, quantity } = data;

    log("Cart.findOne execution started");
    let cart = await Cart.findOne({ user: userId });
    log("Cart.findOne execution completed");

    // Check if cart exists
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    log(`existingItem: ${JSON.stringify(existingItem)}`);

    // Check if item already exists in cart
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    // Fetch clean cart for response
    log("Cart.findOne execution started");
    const updatedCart = await Cart.findOne({ user: userId }).lean().select("-__v");
    log("Cart.findOne execution completed");

    return {
      message: "Item added to cart successfully",
      data: updatedCart,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// updateCartItem service
export const updateCartItem = async (userId, itemId, quantity, log) => {
  try {
    log("updateCartItem execution started");
    const cart = await Cart.findOne({ user: userId }).select("-__v");
    log("updateCartItem execution completed");

    // Check if cart exists
    if (!cart) {
      const err = new Error("Cart not found");
      err.statusCode = 404;
      throw err;
    }

    const item = cart.items.id(itemId);

    // Check if item exists
    if (!item) {
      const err = new Error("Cart item not found");
      err.statusCode = 404;
      throw err;
    }

    item.quantity = quantity;
    await cart.save();

    return {
      message: "Cart item quantity updated",
      data: cart,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// removeCartItem service
export const removeCartItem = async (userId, itemId, log) => {
  try {
    log("removeCartItem execution started");
    const cart = await Cart.findOne({ user: userId });
    log("removeCartItem execution completed");

    // Check if cart exists
    if (!cart) {
      const err = new Error("Cart not found");
      err.statusCode = 404;
      throw err;
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    return {
      message: "Item removed from cart successfully",
      data: cart,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// clearCart service
export const clearCart = async (userId, log) => {
  try {
    log("clearCart execution started");
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });
    log("clearCart execution completed");

    return {
      message: "Cart cleared successfully",
      data: null,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
