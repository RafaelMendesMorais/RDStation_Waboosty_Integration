import { NextFunction, Request, Response } from "express";
import { waboostyWebhookSchema } from "../schemas/waboosty.schema";
import { leadService } from "../services/lead.service";


export async function receiveWaboostyWebhook( req: Request, res: Response, next: NextFunction){
    try {
        const validatedData = waboostyWebhookSchema.safeParse(req.body)

        if(!validatedData.success){
            return res.status(400).json({
                error: validatedData.error.format()
            })
        }

        await leadService.updateLeadStatus(validatedData.data)

        return res.status(200).json({
            message: "Status recebido e atualizado na RD "
        })
        
    } catch (error) {
        next(error)
    }
}