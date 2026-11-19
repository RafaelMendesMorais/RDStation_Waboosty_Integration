import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import webhookRoutes from "./routes/webhook.routes";

export const app = express();

app.use(express.json());
app.use("/webhook", webhookRoutes);
app.use(errorMiddleware);
