import express from "express";
import "dotenv/config";
import cors from "cors";

import ragRouter from "./routes/ragRouter.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/api", ragRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
