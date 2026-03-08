import { NextFunction, Request, Response } from "express";
import { LeadSchema } from "../schemas/lead.schema";
import { LeadService } from "../services/lead.service";
import { logger } from "../utils/logger";


export async function receiveRdWebhook(req: Request, res: Response, next: NextFunction) {
    try {
        const validatedData = LeadSchema.safeParse(req.body)

        if (!validatedData.success) {

            const errors = validatedData.error.issues.map(err => ({
                field: err.path.join("."),
                message: err.message
            }))

            return res.status(422).json({
                message: "Erro de validação",
                errors
            })
        }


        await LeadService.sendToWaboosty(validatedData.data)



        return res.status(200).json({
            Message: "Lead recebido e enviado para Waboosty"
        })

    } catch (error) {
        logger.error("Falha Crítica: RD -> Waboosty");

        next(error)
    }

}