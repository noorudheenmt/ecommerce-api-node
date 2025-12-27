import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "#routes/index.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// routes
app.use("/api", routes);

// api route
app.use("/api", (req, res) => {
  res.status(404).json({ message: "No API routes configured" });
});

export default app;
