import { Request, Response } from "express";
import { LeadSchema } from "../schemas/lead.schema";
import { LeadService } from "../services/lead.service";

export async function receiveRdWebhook(req: Request, res: Response) {
    const lead = LeadSchema.parse(req.body);
    await LeadService.sendToWaboosty(lead);
    res.status(200).json({ Message: "Lead recebido e enviado para Waboosty" });
}
