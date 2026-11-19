import { Request, Response } from "express";
import { waboostyWebhookSchema } from "../schemas/waboosty.schema";
import { LeadService } from "../services/lead.service";

export async function receiveWaboostyWebhook(req: Request, res: Response) {
    const update = waboostyWebhookSchema.parse(req.body);
    await LeadService.updateLeadStatus(update);
    res.status(200).json({ message: "Status recebido e atualizado na RD " });
}
