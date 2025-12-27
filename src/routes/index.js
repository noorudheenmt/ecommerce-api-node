import express from "express";
import pingRoutesV1 from "./v1/pingRoutes.js";
import pingRoutesV2 from "./v2/pingRoutes.js";
import authRoutesV1 from "./v1/authRoutes.js";
import userRoutesV1 from "./v1/userRoutes.js";
import adminRoutesV1 from "./v1/adminRoutes.js";
import prodRoutesv1 from "./v1/prodRoutes.js";
import adminProdRoutes from "./v1/adminProdRoutes.js";

const router = express.Router();

// Mount versioned routes for v1
router.use("/ping/v1", pingRoutesV1);
router.use("/auth/v1", authRoutesV1);
router.use("/user/v1", userRoutesV1);
router.use("/admin/v1", adminRoutesV1);
router.use("/prod/v1", prodRoutesv1);
router.use("/admin/prod/v1", adminProdRoutes);


// Mount versioned routes for v2
router.use("/ping/v2", pingRoutesV2);

export default router;
