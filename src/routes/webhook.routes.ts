import { Router } from "express";
import { receiveRdWebhook } from "../controllers/rd.controller";

const router = Router()

router.post('/rd', receiveRdWebhook)

export default router