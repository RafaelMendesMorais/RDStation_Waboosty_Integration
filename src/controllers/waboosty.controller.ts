import { NextFunction, Request, Response } from "express";
import { waboostyWebhookSchema } from "../schemas/waboosty.schema";
import { LeadService } from "../services/lead.service";
import { logger } from "../utils/logger";


export async function receiveWaboostyWebhook(req: Request, res: Response, next: NextFunction) {
    try {
        const validatedData = waboostyWebhookSchema.safeParse(req.body)

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

        await LeadService.updateLeadStatus(validatedData.data)

        return res.status(200).json({
            message: "Status recebido e atualizado na RD "
        })

    } catch (error) {
        logger.error("Error processing RD webhook")

        next(error)
    }
}