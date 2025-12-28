import Product from "#models/Product.js";

// createProduct service
export const createProduct = async (data, log) => {
  try {
    const product = new Product({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
      brand: data.brand || "",
      isActive: true,
      images: [],
      rating: 0,
      totalReviews: 0,
    });

    // Save product to database
    let savedProduct = await product.save();
    log("savedProduct:", JSON.stringify(savedProduct));

    // Remove __v from response
    savedProduct = savedProduct.toObject();
    delete savedProduct.__v;

    return {
      message: "Product created successfully",
      product: savedProduct,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// updateProduct service
export const updateProduct = async (id, data, log) => {
  try {
    log("productService.updateProduct execution started");
    let updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );
    log("productService.updateProduct execution completed");

    // Remove __v from response
    updatedProduct = updatedProduct.toObject();
    delete updatedProduct.__v;

    // Check if product exists
    if (!updatedProduct) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }

    return {
      message: "Product updated successfully",
      product: updatedProduct,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// deleteProduct service
export const deleteProduct = async (id, log) => {
  try {
    log("productService.deleteProduct execution started");
    const product = await Product.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false },
      { new: true }
    );
    log("productService.deleteProduct execution completed");

    // Check if product exists
    if (!product) {
      const err = new Error("Product not found or already deleted");
      err.statusCode = 404;
      throw err;
    }

    return {
      message: "Product deleted successfully",
      productId: product._id,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// uploadProductImages service
export const uploadProductImages = async (productId, files, log) => {
  try {
    // Check if files are provided
    if (!files || files.length === 0) throw new Error("No images uploaded");

    // Only save the URL
    const uploadedImages = files.map((file) => file.path);

    log("Product.findByIdAndUpdate started");
    const product = await Product.findByIdAndUpdate(
      productId,
      { $push: { images: { $each: uploadedImages } } },
      { new: true }
    );
    log("Product.findByIdAndUpdate completed");

    // Check if product exists
    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }

    return {
      message: "Images uploaded successfully",
      productId: product._id,
      uploadedImages: uploadedImages,
    };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
