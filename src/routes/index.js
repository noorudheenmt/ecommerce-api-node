import express from "express";
import pingRoutesV1 from "./v1/pingRoutes.js";
import pingRoutesV2 from "./v2/pingRoutes.js";
import authRoutesV1 from "./v1/authRoutes.js";

const router = express.Router();

// Mount versioned routes for v1
router.use("/ping/v1", pingRoutesV1);
router.use("/auth/v1", authRoutesV1);

// Mount versioned routes for v2
router.use("/ping/v2", pingRoutesV2);

export default router;
