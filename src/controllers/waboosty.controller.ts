import { NextFunction, Request, Response } from "express";
import { waboostyWebhookSchema } from "../schemas/waboosty.schema";


export async function receiveWaboostyWebhook( req: Request, res: Response, next: NextFunction){
    try {
        const validatedData = waboostyWebhookSchema.parse(req.body)


        
    } catch (error) {
        next(error)
    }
}