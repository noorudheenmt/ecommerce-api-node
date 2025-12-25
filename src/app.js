import express from "express";
import cors from "cors";
import helmet from "helmet";
import pingRoutes from "./routes/pingRoutes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// ping route
app.use('/api', pingRoutes);

// api route
app.use("/api", (req, res) => {
  res.status(404).json({ message: "No API routes configured" });
});

export default app;
