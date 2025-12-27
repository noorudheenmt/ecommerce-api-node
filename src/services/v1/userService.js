import User from "#models/user.js";
import Address from "#models/address.js";

// getprofile service
export const getProfile = async (userId, log) => {
  try {
    log("User.findById started");
    const user = await User.findById(userId).select(
      "-password -resetToken -resetTokenExpiresAt -__v"
    );
    log("User.findById completed");

    // Check if user exists
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    return user;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// update profile service
export const updateProfile = async (userId, data, log) => {
  try {
    log("User.findByIdAndUpdate started");
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true, runValidators: true }
    ).select("-password -resetToken -resetTokenExpiresAt -__v");
    log("User.findByIdAndUpdate completed");

    // Check if user exists
    if (!updatedUser) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    return updatedUser;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// get addresses service
export const getAddresses = async (userId, log) => {
  try {
    log("Address.find by userId started");
    let addresses = await Address.find({ userId }).sort({ createdAt: -1 });
    log("Address.find by userId completed");
    
    // Remove __v from response
    addresses = addresses.map(address => {
      const addressObj = address.toObject();
      delete addressObj.__v;
      return addressObj;
    });

    return addresses;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// add address service
export const addAddress = async (userId, data, log) => {
  try {
    // isDefault handling
    if (data.isDefault) {
      log("Address.updateMany is started");
      await Address.updateMany({ userId }, { $set: { isDefault: false } });
      log("Address.updateMany is completed");
    }

    log("Adding new address started");
    let address = await Address.create({
      ...data,
      userId,
    });
    log("Adding new address completed");

    // Remove __v from response
    address = address.toObject();
    delete address.__v;

    return address;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// Update address
export const updateAddress = async (userId, addressId, data, log) => {
  try {
    // isDefault handling
    if (data.isDefault) {
      log("Address.updateMany is started");
      await Address.updateMany({ userId }, { $set: { isDefault: false } });
      log("Address.updateMany is completed");
    }

    log("Address.findOneAndUpdate started");
    let address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { $set: data },
      { new: true, runValidators: true }
    );
    log("Address.findOneAndUpdate completed");

    // Remove __v from response
    address = address.toObject();
    delete address.__v;

    // Check if address exists
    if (!address) {
      const err = new Error("Address not found");
      err.statusCode = 404;
      throw err;
    }

    return address;
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};

// delete address service
export const deleteAddress = async (userId, addressId, log) => {
  try {
    log("Address.findOneAndDelete started");
    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });
    log("Address.findOneAndDelete completed");

    // Check if address exists
    if (!address) {
      const err = new Error("Address not found");
      err.statusCode = 404;
      throw err;
    }

    return { message: "Address deleted successfully" };
  } catch (error) {
    log(error.stack, "error");
    throw error;
  }
};
