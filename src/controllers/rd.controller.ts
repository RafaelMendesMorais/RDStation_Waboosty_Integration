import { NextFunction, Request, Response } from "express";
import { LeadSchema } from "../schemas/lead.schema";
import { leadService } from "../services/lead.service";
import { logger } from "../utils/logger";


export async function receiveRdWebhook(req: Request, res: Response, next: NextFunction) {
    try {
        const validatedData = LeadSchema.safeParse(req.body)

        if(!validatedData.success){
            return res.status(400).json({
                error: validatedData.error.format()
            })
        }

        await leadService.sendToWaboosty(validatedData.data)

        

        return res.status(200).json({
            Message: "Lead recebido e enviado para Waboosty"
        })
        
    } catch (error) {
        logger.error("Failed to send lead to Waboosty")

        next(error)
    }
    
}