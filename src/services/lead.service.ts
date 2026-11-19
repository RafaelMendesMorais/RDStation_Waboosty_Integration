import { RdStationClient } from "../integrations/rdstation.client";
import { WaboostyClient } from "../integrations/waboosty.client";
import { LeadInput } from "../schemas/lead.schema";
import { WaboostyWebhookInput } from "../schemas/waboosty.schema";

export class LeadService{

    static async sendToWaboosty( lead: LeadInput ){
        await WaboostyClient.createLead(lead)
    }

    static async updateLeadStatus(data: WaboostyWebhookInput) {
        await RdStationClient.updateLeadStatus(data)
    }
}