import { NextFunction, Request, Response } from "express";
import { LeadSchema } from "../schemas/lead.schema";
import { leadService } from "../services/lead.service";


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
        next(error)
    }
    
}