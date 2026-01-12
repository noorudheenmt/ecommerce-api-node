import express from "express";
// Public Routes
import pingRoutesV1 from "./v1/public/pingRoutes.js";
import authRoutesV1 from "./v1/public/authRoutes.js";
import userRoutesV1 from "./v1/public/userRoutes.js";
import prodRoutesv1 from "./v1/public/prodRoutes.js";
import catgRoutesv1 from "./v1/public/catgRoutes.js";
import cartRoutesV1 from "./v1/public/cartRoutes.js";
import orderRoutesV1 from "./v1/public/orderRoutes.js";
import paymRoutesV1 from "./v1/public/paymRoutes.js";
import reviewRoutesV1 from "./v1/public/reviewRoutes.js";
import wishRoutesV1 from "./v1/public/wishRoutes.js";
import pingRoutesV2 from "./v2/public/pingRoutes.js";

// Admin Routes
import adminUserRoutesV1 from "./v1/admin/adminUserRoutes.js";
import adminProdRoutesV1 from "./v1/admin/adminProdRoutes.js";
import adminCatgRoutesV1 from "./v1/admin/adminCatgRoutes.js";
import adminOrderRoutesV1 from "./v1/admin/adminOrderRoutes.js";

const router = express.Router();

// Public Routes
router.use("/ping/v1", pingRoutesV1);
router.use("/auth/v1", authRoutesV1);
router.use("/user/v1", userRoutesV1);
router.use("/prod/v1", prodRoutesv1);
router.use("/catg/v1", catgRoutesv1);
router.use("/cart/v1", cartRoutesV1);
router.use("/order/v1", orderRoutesV1);
router.use("/paym/v1", paymRoutesV1);
router.use("/review/v1", reviewRoutesV1);
router.use("/wish/v1", wishRoutesV1);
router.use("/ping/v2", pingRoutesV2);

// Admin Routes
router.use("/admin/user/v1", adminUserRoutesV1);
router.use("/admin/prod/v1", adminProdRoutesV1);
router.use("/admin/catg/v1", adminCatgRoutesV1);
router.use("/admin/order/v1", adminOrderRoutesV1);

export default router;
