import { NextFunction, Request, Response } from "express";
import { LeadSchema } from "../schemas/lead.schema";
import { leadService } from "../services/lead.service";


export async function receiveRdWebhook(req: Request, res: Response, next: NextFunction) {
    try {
        const validadedData = LeadSchema.parse(req.body)

        await leadService.sendToWaboosty(validadedData)

        return res.status(200).json({
            Message: "Lead recebido e enviado para Waboosty"
        })
        
    } catch (error) {
        next(error)
    }
    
}