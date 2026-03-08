import { Router } from "express";
import { receiveRdWebhook } from "../controllers/rd.controller";
import { receiveWaboostyWebhook } from "../controllers/waboosty.controller";

const router = Router()

router.post('/rd', receiveRdWebhook)
router.post('/waboosty',receiveWaboostyWebhook )
    
export default router