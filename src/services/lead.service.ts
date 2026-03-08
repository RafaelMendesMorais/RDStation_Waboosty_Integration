import { WaboostyClient } from "../integrations/waboosty.client";
import { LeadInput } from "../schemas/lead.schema";
import { WaboostyWebhookInput } from "../schemas/waboosty.schema";

export class leadService{

    static async sendToWaboosty( lead: LeadInput ){
        await WaboostyClient.createLead(lead)
    }

    static async updateLeadStatus(data: WaboostyWebhookInput) {
        
    }
}