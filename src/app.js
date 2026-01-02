import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "#routes/index.js";
import paymRoutesV1 from "#routes/v1/public/paymRoutes.js";

const app = express();

app.use(cors());
app.use(helmet());

// razorpay webhook call
app.use("/api/paym/v1/webhook", paymRoutesV1);

app.use(express.json());

// routes
app.use("/api", routes);

// api route
app.use("/api", (req, res) => {
  res.status(404).json({ message: "No API routes configured" });
});

export default app;
